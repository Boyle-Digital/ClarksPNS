# scripts/patch_stores_json.py
import json
from pathlib import Path

JSON_PATH = Path(r"ClarksPNS/src/assets/data/stores.geocoded.json")

FOOD_KEYS = ["clarkscafe", "krispykrunchy", "champs", "hangar", "jacks", "grabngo"]
FUEL_DEFAULTS = {
    "marathon": True,
    "arco": False,
}

def main():
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))

    for sid, entry in data.items():
        # --- amenities: ensure carwash exists, default false ---
        am = entry.setdefault("amenities", {})
        am.setdefault("carwash", False)

        # --- food: ensure block exists, but DO NOT overwrite manual values ---
        food = entry.setdefault("food", {})
        for k in FOOD_KEYS:
            food.setdefault(k, False)

        # --- fuel: add block, but don’t overwrite if already present ---
        fuel = entry.setdefault("fuel", {})
        for k, v in FUEL_DEFAULTS.items():
            fuel.setdefault(k, v)

    JSON_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Patched {len(data)} stores with amenities.carwash, ensured food keys, and added fuel defaults.")

if __name__ == "__main__":
    main()