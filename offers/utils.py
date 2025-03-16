import requests
from decouple import config
from .models import Offer

GOOGLE_MAPS_API_KEY = config("GOOGLE_MAPS_API_KEY")

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