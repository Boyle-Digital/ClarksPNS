// src/lib/geocode_stores.mjs
import fs from "node:fs/promises";
import crypto from "node:crypto";

// ── Load environment variables (local + vercel) ───────────────────────────────
try {
  // Prefer .env.local, then .env (both optional). This does nothing on Vercel.
  const { config } = await import("dotenv");
  config({ path: ".env.local", override: true });
  config({ path: ".env", override: false });
} catch { /* dotenv not installed on prod; fine on Vercel */ }

// Use your var name:
const KEY = process.env.VITE_GOOGLE_MAPS_API_KEY;

if (!KEY) {
  console.error("Missing VITE_GOOGLE_MAPS_API_KEY env var.");
  console.error("• Locally: put it in .env.local (same folder as package.json)");
  console.error("• Vercel: Project → Settings → Environment Variables");
  process.exit(1);
}

// ── Config ────────────────────────────────────────────────────────────────────
const STORES_SRC = "./src/assets/data/stores.json";
const STORES_OUT = "./src/assets/data/stores.geocoded.json";
const FAIL_CSV   = "./src/assets/data/geocode_failures.csv";
const PACE_EVERY = 5;
const PACE_MS    = 150;

// ── Utils ─────────────────────────────────────────────────────────────────────
async function sha256(path) {
  const buf = await fs.readFile(path);
  return crypto.createHash("sha256").update(buf).digest("hex");
}

function cleanZip(z) {
  if (z == null) return "";
  const s = String(z).trim();
  return s.endsWith(".0") ? s.slice(0, -2) : s;
}

function fullAddress(s) {
  const parts = [
    s.address?.trim(),
    s.city?.trim(),
    s.state?.trim(),
    cleanZip(s.zip),
  ].filter(Boolean);
  return parts.join(", ");
}

async function geocode(id, address) {
  const url = "https://maps.googleapis.com/maps/api/geocode/json?address="
    + encodeURIComponent(address) + `&key=${KEY}`;
  console.log(`➡️ [${id}] Request: ${url}`);

  const r = await fetch(url);
  const j = await r.json();

  if (j.status === "OK" && j.results?.[0]?.geometry?.location) {
    const { lat, lng } = j.results[0].geometry.location;
    return { lat: +lat, lng: +lng };
  } else {
    const em = j.error_message || "";
    console.error(`❌ [${id}] Geocode failed for "${address}" → ${j.status} ${em}`);
    return { error: j.status, error_message: em };
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
const stores = JSON.parse(await fs.readFile(STORES_SRC, "utf8"));
let prevOut = null;
try {
  prevOut = JSON.parse(await fs.readFile(STORES_OUT, "utf8"));
} catch { /* first run */ }

const srcHash = await sha256(STORES_SRC);
const prevHash = prevOut?.__meta?.srcHash;

if (prevHash === srcHash) {
  console.log("🟰 stores.json unchanged — skipping geocode.");
  process.exit(0);
}

const out = { __meta: { srcHash, generatedAt: new Date().toISOString() } };
const failures = [];
let count = 0;

for (const [id, s] of Object.entries(stores)) {
  const addr = fullAddress(s);

  if (!addr) {
    console.warn(`⚠️ [${id}] Skipping — empty/malformed address`);
    out[id] = { ...s };
    failures.push({ id, address: "", status: "EMPTY_ADDRESS", error_message: "" });
    continue;
  }

  // reuse previous lat/lng if address unchanged
  const prev = prevOut?.[id];
  const prevAddr = prev?.__addr;
  if (prev && prevAddr === addr && typeof prev.lat === "number" && typeof prev.lng === "number") {
    out[id] = { ...s, lat: prev.lat, lng: prev.lng, __addr: addr };
    continue;
  }

  const res = await geocode(id, addr);

  if (res?.lat != null && res?.lng != null) {
    out[id] = { ...s, lat: res.lat, lng: res.lng, __addr: addr };
  } else {
    out[id] = { ...s, __addr: addr };
    failures.push({ id, address: addr, status: res?.error || "UNKNOWN", error_message: res?.error_message || "" });
  }

  if (++count % PACE_EVERY === 0) {
    await new Promise(r => setTimeout(r, PACE_MS));
  }
}

await fs.writeFile(STORES_OUT, JSON.stringify(out, null, 2));
console.log("✅ Wrote", STORES_OUT);

if (failures.length) {
  const csv = [
    "id,address,status,error_message",
    ...failures.map(f =>
      `"${f.id}","${(f.address || "").replaceAll('"', '""')}","${f.status}","${(f.error_message || "").replaceAll('"','""')}"`
    ),
  ].join("\n");
  await fs.writeFile(FAIL_CSV, csv);
  console.log(`⚠️ Wrote ${failures.length} failures to ${FAIL_CSV}`);
} else {
  console.log("🎉 No failures.");
}
