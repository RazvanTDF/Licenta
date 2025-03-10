import requests
from decouple import config
from .models import Offer

# Obține API Key din .env
GOOGLE_MAPS_API_KEY = config("GOOGLE_MAPS_API_KEY")


def get_distance_from_google_routes(origin, destination):
    """
    Utilizează Google Routes API pentru a calcula distanța în kilometri între două locații.
    """
    try:
        # URL-ul pentru Google Routes API
        url = "https://routes.googleapis.com/directions/v2:computeRoutes"
        headers = {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
            "X-Goog-FieldMask": "routes.distanceMeters"
        }
        data = {
            "origin": {"location": {"address": origin}},
            "destination": {"location": {"address": destination}},
            "travelMode": "DRIVE"
        }
        
        response = requests.post(url, json=data, headers=headers)
        response_data = response.json()
        
        if "routes" in response_data and response_data["routes"]:
            distance_meters = response_data["routes"][0]["distanceMeters"]
            distance_km = distance_meters / 1000  # Conversie în kilometri
            return round(distance_km, 2)

    except Exception as e:
        print(f"Google Maps Routes API error: {e}")
    
    return 0


def calculate_best_offer():
    """
    Selectează cea mai bună ofertă pe baza raportului preț/km, eliminând duplicatele
    și utilizând Google Routes API pentru a completa distanțele lipsă.
    """
    # Resetăm câmpul `best_offer` pentru toate ofertele
    Offer.objects.update(best_offer=False)

    # Preluăm toate ofertele din baza de date
    offers = Offer.objects.all()

    # Eliminăm duplicatele în funcție de locațiile de încărcare și descărcare
    unique_offers = {}
    for offer in offers:
        # Normalizează locațiile pentru a evita probleme cu spații sau caractere suplimentare
        loading = offer.loading_location.strip().lower()
        unloading = offer.unloading_location.strip().lower()
        key = (loading, unloading)

        if key not in unique_offers:
            # Calculăm distanța dacă aceasta nu este specificată
            if not offer.distance_km or offer.distance_km <= 0:
                distance = get_distance_from_google_routes(offer.loading_location, offer.unloading_location)
                offer.distance_km = distance
                offer.save()

            unique_offers[key] = offer
        else:
            # Ignorăm oferta dacă există deja una cu aceleași locații
            continue

    # Convertim în listă după eliminarea duplicatelor
    filtered_offers = list(unique_offers.values())

    # Selectăm oferta cu cel mai bun raport preț/km
    best_offer = max(
        filtered_offers,
        key=lambda o: o.price / o.distance_km if o.distance_km > 0 else float('-inf'),
        default=None
    )

    # Marcăm oferta câștigătoare ca fiind cea mai bună
    if best_offer:
        best_offer.best_offer = True
        best_offer.save()
