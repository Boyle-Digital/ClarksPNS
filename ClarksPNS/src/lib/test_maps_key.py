import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

if not API_KEY:
    print("❌ No API key found. Make sure .env is set up correctly.")
    exit(1)

# Test request: Geocode "New York"
url = "https://maps.googleapis.com/maps/api/geocode/json"
params = {
    "address": "New York",
    "key": API_KEY
}

response = requests.get(url, params=params)

if response.status_code == 200:
    data = response.json()
    if "results" in data and len(data["results"]) > 0:
        print("✅ API key works!")
        print("Formatted address:", data["results"][0]["formatted_address"])
    else:
        print("⚠️ API key valid, but request returned no results. Check API restrictions.")
else:
    print("❌ Request failed with status:", response.status_code)
    print(response.text)
