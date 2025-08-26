from __future__ import annotations
import argparse
import json
from pathlib import Path
from typing import Dict, List

import pandas as pd


DAYS = ["SUN", "MON", "TUES", "WED", "THUR", "FRI", "SAT"]

def to_hhmm(n: int) -> str:
    """Convert an hour 0-24 into 'HH:MM'."""
    n = int(n)
    return f"{n:02d}:00"

def parse_hours_cell(value) -> Dict[str, object]:
    """
    Accepts values like '7-11', '24', '6-1', 'closed', blank/NaN.
    Returns {open, close, closed, overnight}.
    - '24' => 00:00-24:00 (closed=False, overnight=True)
    - '6-1' => 06:00-01:00 (overnight=True)
    - blanks/'closed' => closed=True
    """
    if pd.isna(value):
        return {"open": "", "close": "", "closed": True, "overnight": False}

    s = str(value).strip().lower()
    if s in {"", "closed", "c"}:
        return {"open": "", "close": "", "closed": True, "overnight": False}

    if s == "24" or s == "24hrs" or s == "24h":
        return {"open": "00:00", "close": "24:00", "closed": False, "overnight": True}

    # Expect patterns like '6-1', '7-11'
    if "-" in s:
        try:
            open_h, close_h = s.split("-", 1)
            o = int(open_h)
            c = int(close_h)
            overnight = c < o  # close after midnight
            return {"open": to_hhmm(o), "close": to_hhmm(c), "closed": False, "overnight": overnight}
        except Exception:
            # Fallback to closed if unparsable
            return {"open": "", "close": "", "closed": True, "overnight": False}

    # Fallback: unknown format
    return {"open": "", "close": "", "closed": True, "overnight": False}

def find_range_columns(cols: List[str], start_name: str, end_name: str | None) -> List[str]:
    """Return a slice of columns between start_name and end_name (inclusive)."""
    start_idx = cols.index(start_name)
    end_idx = len(cols) - 1 if end_name is None else cols.index(end_name)
    return cols[start_idx : end_idx + 1]

def pick_day_column(subcols: List[str], day_key: str) -> str | None:
    """
    Find the first column in subcols that matches a day label (e.g., SUN, MON…),
    ignoring dots and spaces, and case-insensitive. Handles oddities like ' FRI' vs 'FRI.1'.
    """
    needle = day_key.upper()
    for c in subcols:
        norm = c.replace(".", "").replace(" ", "").upper()
        if needle in norm:
            return c
    return None

def extract_group(df: pd.DataFrame, start_col: str, end_col: str | None, store_col_name: str) -> List[Dict]:
    cols = list(df.columns)
    subcols = find_range_columns(cols, start_col, end_col)
    out = []

    for _, row in df.iterrows():
        store_id = row.get(store_col_name)
        if pd.isna(store_id):
            continue
        store = {
            "id": str(int(store_id)),
            "name": "",
            "address": "",
            "phone": "",
            "services": [],
            "hours": {}
        }
        for day in DAYS:
            col = pick_day_column(subcols, day)
            val = row[col] if col in df.columns else None
            store["hours"][day.lower()] = parse_hours_cell(val)
        out.append(store)
    return out

def main():
    ap = argparse.ArgumentParser(description="Convert store hours Excel to locations.json")
    ap.add_argument("--in", dest="in_path", required=True, help="Path to XLSX file")
    ap.add_argument("--out", dest="out_path", required=True, help="Path to output JSON")
    ap.add_argument("--sheet", default="Sheet1", help="Sheet name (default: Sheet1)")
    args = ap.parse_args()

    in_path = Path(args.in_path)
    out_path = Path(args.out_path)

    # Read sheet
    df = pd.read_excel(in_path, sheet_name=args.sheet)

    # We expect two blocks: left (STORE..SAT) and right (STORE.1..SAT.1),
    # but be resilient to funky column names like ' FRI' on the right block.
    cols = list(df.columns)

    if "STORE" not in cols:
        raise RuntimeError("Could not find 'STORE' column in sheet")

    # LEFT block: STORE .. SAT (inclusive)
    left_end = "SAT" if "SAT" in cols else None
    left = extract_group(df, start_col="STORE", end_col=left_end, store_col_name="STORE")

    # RIGHT block: STORE.1 .. (end) (if present)
    right = []
    if "STORE.1" in cols:
        # Try to end at SAT.1, else take to end
        right_end = "SAT.1" if "SAT.1" in cols else None
        right = extract_group(df, start_col="STORE.1", end_col=right_end, store_col_name="STORE.1")

    all_stores = left + right

    # Sort by numeric store id
    def num_id(s): 
        try: return int(s["id"])
        except: return 10**9
    all_stores.sort(key=num_id)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    with out_path.open("w", encoding="utf-8") as f:
        json.dump(all_stores, f, indent=2)
    print(f"Wrote {len(all_stores)} stores → {out_path}")

if __name__ == "__main__":
    main()
