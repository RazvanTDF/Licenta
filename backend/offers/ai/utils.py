import re
from datetime import datetime
import requests
from decouple import config

GOOGLE_MAPS_API_KEY = config("GOOGLE_MAPS_API_KEY")

def is_valid_location(location_name):
    url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        "address": location_name,
        "key": GOOGLE_MAPS_API_KEY
    }
    try:
        response = requests.get(url, params=params, timeout=5)
        data = response.json()
        return bool(data.get("results"))
    except Exception:
        return False

def get_distance_km(origin, destination):
    url = "https://routes.googleapis.com/directions/v2:computeRoutes"
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
        "X-Goog-FieldMask": "routes.distanceMeters"
    }
    data = {
        "origin": {"address": origin},
        "destination": {"address": destination},
        "travelMode": "DRIVE"
    }

    try:
        response = requests.post(url, headers=headers, json=data, timeout=5)
        data = response.json()

        if "routes" in data and data["routes"]:
            distance_meters = data["routes"][0]["distanceMeters"]
            return round(distance_meters / 1000, 2)
        else:
            print("❗ Răspuns fără distanță:", data)
            return None
    except Exception as e:
        print("❗ Eroare la distanță:", e)
        return None


def parse_price_ai(price_str):
    try:
        clean = re.sub(r"[^\d.,]", "", price_str)
        if "," in clean and "." in clean:
            if clean.rfind(",") > clean.rfind("."):
                clean = clean.replace(".", "").replace(",", ".")
            else:
                clean = clean.replace(",", "")
        elif "," in clean:
            parts = clean.split(",")
            if len(parts[-1]) != 3:
                clean = clean.replace(",", ".")
            else:
                clean = clean.replace(",", "")
        return round(float(clean), 2)
    except:
        return 0.0

def parse_weight_ai(weight_str):
    try:
        return float(re.sub(r"[^\d.]", "", weight_str.replace(",", ".")))
    except:
        return 0.0

def parse_date_ai(date_str):
    formats = ["%d/%m/%Y", "%d.%m.%Y", "%Y-%m-%d"]
    for fmt in formats:
        try:
            return datetime.strptime(date_str.strip(), fmt)
        except:
            continue
    return None

def extract_offer_details_from_ai(doc):
    details = {
        "loading_location": None,
        "unloading_location": None,
        "loading_date": None,
        "unloading_date": None,
        "price": None,
        "weight_kg": None,
    }

    blacklist = {"greutate", "preț", "pret", "observații", "detalii", "kg", "eur", "euro"}

    locations = []
    dates = []

    lines = [line.strip() for line in doc.text.splitlines() if line.strip()]

    # Identificare locații și date direct din text pentru acuratețe mai mare
    for line in lines:
        if re.search(r'înc[aă]rcare[:\s]', line, re.I):
            loc = re.sub(r'.*[:]\s*', '', line)
            if loc.lower() not in blacklist and is_valid_location(loc):
                locations.append(loc)

        elif re.search(r'desc[aă]rcare[:\s]', line, re.I):
            loc = re.sub(r'.*[:]\s*', '', line)
            if loc.lower() not in blacklist and is_valid_location(loc):
                locations.append(loc)

        elif re.search(r'data .*?[:]\s*', line, re.I):
            date = parse_date_ai(re.sub(r'.*[:]\s*', '', line))
            if date:
                dates.append(date)

    # Fallback spaCy dacă lipsesc date din text
    for ent in doc.ents:
        label, value = ent.label_, ent.text.strip()

        if label in ("MONEY") and not details["price"]:
            details["price"] = parse_price_ai(value)

        elif label == "QUANTITY" and not details["weight_kg"]:
            details["weight_kg"] = parse_weight_ai(value)

    # Asignarea locațiilor
    if len(locations) >= 1:
        details["loading_location"] = locations[0]

    if len(locations) >= 2:
        details["unloading_location"] = locations[1]

    # Asignarea datelor
    if dates:
        details["loading_date"] = dates[0]

    if len(dates) >= 2:
        details["unloading_date"] = dates[1]

    return details
