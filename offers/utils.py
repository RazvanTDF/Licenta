import re
import requests
from decouple import config
from django.db.models import Avg, F, FloatField, ExpressionWrapper
from .models import Offer
from datetime import datetime


GOOGLE_MAPS_API_KEY = config("GOOGLE_MAPS_API_KEY")

def parse_date_ai(date_str):
    formats = ["%d/%m/%Y", "%d.%m.%Y", "%Y-%m-%d"]
    for fmt in formats:
        try:
            return datetime.strptime(date_str.strip(), fmt)
        except:
            continue
    return None

def recommend_price_simple(loading_location, unloading_location, distance_km, weight_kg):
    offers = Offer.objects.filter(
        loading_location__iexact=loading_location.strip(),
        unloading_location__iexact=unloading_location.strip(),
        price__isnull=False,
        distance_km__gt=0,
        weight_kg__gt=0
    ).annotate(
        price_per_km_kg=ExpressionWrapper(
            F('price') / (F('distance_km') * F('weight_kg')),
            output_field=FloatField()
        )
    )

    avg_price_per_km_kg = offers.aggregate(
        avg=Avg('price_per_km_kg')
    )['avg']

    if avg_price_per_km_kg:
        recommended_price = round(weight_kg * distance_km * avg_price_per_km_kg, 2)
        return recommended_price

    return None

def get_distance_from_google_routes(origin, destination):
    """
    Folosește Google Routes API pentru a obține distanța exactă (în km).
    """
    try:
        url = "https://routes.googleapis.com/directions/v2:computeRoutes"
        headers = {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
            "X-Goog-FieldMask": "routes.distanceMeters"
        }
        body = {
            "origin": {"address": origin},
            "destination": {"address": destination},
            "travelMode": "DRIVE",
            "routingPreference": "TRAFFIC_AWARE"
        }

        response = requests.post(url, headers=headers, json=body)
        response.raise_for_status()
        data = response.json()

        if data.get("routes"):
            distance_meters = data["routes"][0]["distanceMeters"]
            distance_km = round(distance_meters / 1000, 2)
            print(f"✅ Distanță obținută: {distance_km} km între {origin} și {destination}")
            return distance_km
        else:
            print(f"⚠️ Răspuns invalid API: {data}")

    except requests.exceptions.RequestException as e:
        print(f"❌ Eroare la apelul API Routes: {e}")
    except (IndexError, KeyError) as e:
        print(f"❌ Răspuns neașteptat de la API Routes: {e}")

    return 0

def parse_email_content(email_body):
    
    """
    Parsează corpul emailului și returnează informațiile extrase cu regex.
    Recunoaște câteva sinonime pentru termeni uzuali.
    """
    # Adăugare protecție dacă email_body este None sau nu este string
    if not email_body or not isinstance(email_body, str):
        print("⚠️ Email body invalid sau inexistent, trecem peste acest email.")
        return {}
    terms_mapping = {
        "loading_location": [
            r"(?:încărcare|incarcare|origin|from|origen)\s*:\s*(.+)",
            re.IGNORECASE
        ],
        "unloading_location": [
            r"(?:descărcare|descarcare|destination|destinatie|destinaţie|to|destino)\s*:\s*(.+)",
            re.IGNORECASE
        ],
        "loading_date": [
            r"(?:data\s*încărcare|data\s*incarcare|loading\s*date|fecha\s*de\s*carga)\s*:\s*(.+)",
            re.IGNORECASE
        ],
        "unloading_date": [
            r"(?:data\s*descărcare|data\s*descarcare|unloading\s*date|fecha\s*de\s*descarga)\s*:\s*(.+)",
            re.IGNORECASE
        ],
        "price": [
            r"(?:preț|pret|price|precio)\s*:\s*([\d.,]+)\s*(?:eur|ron|usd|euro)?",
            re.IGNORECASE
        ],
        "distance_km": [
            r"(?:distanță|distanta|distance|km|kms)\s*:\s*([\d.,]+)",
            re.IGNORECASE
        ],
        "weight_kg": [
            r"(?:greutate|weight|peso)\s*:\s*([\d.,]+)",
            re.IGNORECASE
        ],
        "cargo_details": [
            r"(?:cargo\s*details|detalii\s*mărfă|detalii\s*marfa)\s*:\s*(.+)",
            re.IGNORECASE
        ],
        "observations": [
            r"(?:observații|observatii|observations|notas)\s*:\s*(.+)",
            re.IGNORECASE
        ],
    }
    
    
    details = {}
    for key, (pattern, flags) in terms_mapping.items():
        match = re.search(pattern, email_body, flags)
        if match:
            value = match.group(1).strip()

            # Conversie pentru date
            if key in ["loading_date", "unloading_date"]:
                parsed_date = parse_date_ai(value)
                details[key] = parsed_date
                print(f"[DEBUG] Parsed date for {key}: {parsed_date}")
            elif key in ["price", "distance_km", "weight_kg"]:
                value = value.replace(",", ".")
                try:
                    details[key] = float(value)
                except:
                    details[key] = 0.0
                print(f"[DEBUG] Parsed float for {key}: {details[key]}")
            else:
                details[key] = value
                print(f"[DEBUG] Found value for {key}: {value} ({type(value)})")

    return details



def calculate_best_offer():
    """
    Actualizează cea mai bună ofertă folosind Google Routes API pentru distanțele lipsă.
    """
    Offer.objects.update(best_offer=False)
    offers = Offer.objects.all()
    unique_offers = {}

    for offer in offers:
        loading = offer.loading_location.strip().lower()
        unloading = offer.unloading_location.strip().lower()
        key = (loading, unloading)

        if key not in unique_offers:
            if not offer.distance_km or offer.distance_km <= 0:
                distance = get_distance_from_google_routes(offer.loading_location, offer.unloading_location)
                if distance > 0:
                    offer.distance_km = distance
                    offer.save()

            unique_offers[key] = offer

    filtered_offers = list(unique_offers.values())

    best_offer = max(
        filtered_offers,
        key=lambda o: (o.price / o.distance_km) if o.distance_km else float('-inf'),
        default=None
    )

    if best_offer:
        best_offer.best_offer = True
        best_offer.save()
        print(f"✅ Cea mai bună ofertă actualizată: {best_offer}")
    else:
        print("⚠️ Nu există oferte valide pentru calcularea celei mai bune oferte.")