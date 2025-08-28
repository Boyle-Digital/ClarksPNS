#!/usr/bin/env python3
"""
ParseStoreHours.py
Merge store hours + store metadata into JSON keyed by store number.
Removes manager/manager_cell/supervisor and adds an 'amenities' object with booleans.

Supports BOTH styles:
1) Old-style flags:
   python ParseStoreHours.py --in "STORE HOURS.xlsx" "Store List (10).xlsx" --out "stores.json"

2) Positional:
   python ParseStoreHours.py "STORE HOURS.xlsx" "Store List (10).xlsx" -o "stores.json"
   python ParseStoreHours.py "Store List (10).xlsx" -o "stores.json"

Optional:
   --sheet SHEETNAME   # force a specific sheet for the hours workbook
   --amenities JSON    # optional JSON file to override amenities per store:
                       # { "12": {"beerCave": true, "diesel": true}, "27": {"open24Hours": true} }
"""
import argparse
import json
import re
from pathlib import Path
from typing import Dict, Optional, Tuple, List

import pandas as pd


# ----------------- amenities -----------------
AMENITY_KEYS = [
    "atm",            # all stores: True
    "beerCave",
    "beerSales",      # "Beer Sales without a cave"
    "e85",
    "diesel",
    "kerosene",
    "open24Hours",
    "showers",
    "rvDump",
    "fuel",
]


def default_amenities() -> Dict[str, bool]:
    # All stores have ATMs per spec
    base = {k: False for k in AMENITY_KEYS}
    base["atm"] = True
    return base


# ----------------- helpers -----------------
def normalize_store_id(val) -> Optional[str]:
    if pd.isna(val):
        return None
    if isinstance(val, int):
        return str(val)
    if isinstance(val, float):
        return str(int(val))
    s = str(val).strip()
    m = re.findall(r"\d+", s)
    if m:
        return str(int(m[0]))
    return s or None


def clean_cols(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df.columns = [str(c).strip() for c in df.columns]
    return df


def sniff_hours_like(df: pd.DataFrame) -> bool:
    cols = [str(c).strip().upper() for c in df.columns]
    days = {"SUN", "MON", "TUE", "TUES", "WED", "THU", "THUR", "FRI", "SAT"}
    if len(cols) >= 18:
        return True
    return any(any(day in c for day in days) for c in cols)


def sniff_storelist_like(df: pd.DataFrame) -> bool:
    cols = [str(c).strip().upper() for c in df.columns]
    likely = {"#", "NAME", "ADDRESS", "CITY", "ST", "STATE", "ZIP", "PHONE", "SUPERVISOR", "MANAGER", "CELL #", "FF"}
    return any(c in likely for c in cols)


def read_first_sheet(path: Path, preferred_sheet: Optional[str] = None) -> pd.DataFrame:
    xls = pd.ExcelFile(path)
    if preferred_sheet and preferred_sheet in xls.sheet_names:
        return pd.read_excel(xls, sheet_name=preferred_sheet)
    best = None
    for name in xls.sheet_names:
        try:
            df = pd.read_excel(xls, sheet_name=name)
            if sniff_storelist_like(df) or sniff_hours_like(df):
                best = name
                break
        except Exception:
            continue
    if best is None:
        best = xls.sheet_names[0]
    return pd.read_excel(xls, sheet_name=best)


def extract_hours_blocks(df: pd.DataFrame) -> Tuple[pd.DataFrame, Optional[pd.DataFrame]]:
    df = clean_cols(df)
    cols = list(df.columns)
    if len(cols) >= 18:
        left = df.iloc[:, 0:9].copy()
        right = df.iloc[:, 9:].copy()
        left.columns = ["STORE","TOT HOUR","SUN","MON","TUES","WED","THUR","FRI","SAT"]
        if right.shape[1] >= 9:
            right = right.iloc[:, 0:9].copy()
            right.columns = ["STORE","TOT HOUR","SUN","MON","TUES","WED","THUR","FRI","SAT"]
        else:
            right = clean_cols(right)
        return left, right
    else:
        ren = {}
        for c in cols:
            cu = str(c).strip().upper()
            if cu in {"STORE","#","STORE #","STORE NO","STORE NO."}:
                ren[c] = "STORE"
            elif "TOT" in cu and "HOUR" in cu:
                ren[c] = "TOT HOUR"
            elif cu.startswith("SUN"):
                ren[c] = "SUN"
            elif cu.startswith("MON"):
                ren[c] = "MON"
            elif cu.startswith("TUE"):
                ren[c] = "TUES"
            elif cu.startswith("WED"):
                ren[c] = "WED"
            elif cu.startswith("THU"):
                ren[c] = "THUR"
            elif cu.startswith("FRI"):
                ren[c] = "FRI"
            elif cu.startswith("SAT"):
                ren[c] = "SAT"
        df = df.rename(columns=ren)
        return df, None


def rows_to_hours_map(df: Optional[pd.DataFrame]) -> Dict[str, dict]:
    out: Dict[str, dict] = {}
    if df is None or df.empty:
        return out
    df = clean_cols(df)
    for _, row in df.iterrows():
        sid = normalize_store_id(row.get("STORE"))
        if not sid:
            continue
        hours = {}
        for key in ["SUN","MON","TUES","WED","THUR","FRI","SAT"]:
            if key in df.columns:
                v = row.get(key)
                if pd.isna(v):
                    continue
                hours[key.lower()] = str(v)
        total = row.get("TOT HOUR") if "TOT HOUR" in df.columns else None
        out[sid] = {"total_hours": (None if pd.isna(total) else str(total)) if total is not None else None, "hours": hours}
    return out


def build_meta_map(df: Optional[pd.DataFrame]) -> Dict[str, dict]:
    if df is None or df.empty:
        return {}
    df = clean_cols(df)
    rename_map = {
        "#": "store",
        "Name": "name",
        "Supervisor": "supervisor",
        "Address": "address",
        "City": "city",
        "ST": "state",
        "State": "state",
        "Zip": "zip",
        "Phone": "phone",
        "Manager": "manager",
        "Cell #": "manager_cell",
        "FF": "food_programs",
        "Column1": "brand",
    }
    df = df.rename(columns=rename_map)
    meta: Dict[str, dict] = {}
    for _, row in df.iterrows():
        sid = normalize_store_id(row.get("store") or row.get("#") or row.get("STORE"))
        if not sid:
            continue
        item = {}
        for col in ["name","address","city","state","zip","phone","food_programs","brand"]:
            # intentionally skipping: supervisor, manager, manager_cell
            if col in df.columns:
                val = row.get(col)
                if pd.isna(val):
                    continue
                item[col] = str(val).strip()
        meta[sid] = item
    return meta


def detect_roles(inputs: List[Path], forced_sheet: Optional[str]) -> Tuple[Optional[pd.DataFrame], Optional[pd.DataFrame]]:
    hours_df = None
    stores_df = None
    for p in inputs:
        df = read_first_sheet(p, preferred_sheet=forced_sheet)
        if sniff_hours_like(df) and hours_df is None:
            hours_df = df
        elif sniff_storelist_like(df) and stores_df is None:
            stores_df = df
        else:
            if stores_df is None:
                stores_df = df
            elif hours_df is None:
                hours_df = df
    return hours_df, stores_df


def load_overrides(path: Optional[Path]) -> Dict[str, Dict[str, bool]]:
    """Optional JSON of per-store amenity overrides."""
    if not path:
        return {}
    if not path.exists():
        raise SystemExit(f"Amenities JSON not found: {path}")
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
        # normalize keys to strings
        out = {}
        for k, v in data.items():
            out[str(k)] = {kk: bool(vv) for kk, vv in v.items() if kk in AMENITY_KEYS}
        return out


def main():
    ap = argparse.ArgumentParser(description="Merge store hours + metadata into JSON keyed by store number with amenities.")
    ap.add_argument("--in", "-i", dest="inputs_flag", nargs="+", help="One or two Excel files (any order).")
    ap.add_argument("--out", "-o", dest="output", required=False, default="stores.json", help="Output JSON path.")
    ap.add_argument("--sheet", dest="sheet", required=False, help="Optional sheet name to force for hours workbook.")
    ap.add_argument("--amenities", dest="amenities", required=False, help="Optional JSON file to override amenities per store.")
    ap.add_argument("inputs_pos", nargs="*", help="Positional Excel file(s), if not using --in/-i.")
    args = ap.parse_args()

    inputs = []
    if args.inputs_flag:
        inputs.extend(args.inputs_flag)
    if args.inputs_pos:
        inputs.extend(args.inputs_pos)
    if not inputs:
        ap.error("Provide one or two Excel files via --in or as positional args.")

    paths = [Path(p) for p in inputs]
    for p in paths:
        if not p.exists():
            raise SystemExit(f"File not found: {p}")

    hours_df, stores_df = detect_roles(paths, forced_sheet=args.sheet)

    hoursA = {}
    hoursB = {}
    if hours_df is not None:
        left, right = extract_hours_blocks(hours_df)
        hoursA = rows_to_hours_map(left)
        hoursB = rows_to_hours_map(right)

    meta = build_meta_map(stores_df)

    # Merge
    store_ids = set(meta) | set(hoursA) | set(hoursB)
    merged: Dict[str, dict] = {}

    # Load amenity overrides if provided
    overrides = load_overrides(Path(args.amenities)) if args.amenities else {}

    def _key(s: str) -> int:
        try:
            return int(s)
        except Exception:
            return 10**9

    for sid in sorted(store_ids, key=_key):
        entry = {}
        if sid in meta:
            entry.update(meta[sid])
        if sid in hoursA:
            entry["store_hours"] = hoursA[sid]
        if sid in hoursB:
            entry["alt_hours"] = hoursB[sid]

        # inject amenities (defaults then per-store overrides)
        am = default_amenities()
        if sid in overrides:
            for k, val in overrides[sid].items():
                if k in am:
                    am[k] = bool(val)
        entry["amenities"] = am

        merged[sid] = entry

    out_path = Path(args.output)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(merged, f, ensure_ascii=False, indent=2)

    print(f"Wrote {len(merged)} stores to {out_path.resolve()}")


if __name__ == "__main__":
    main()
