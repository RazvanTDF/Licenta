import googlemaps
from decouple import config
from .models import Offer

# Initializează clientul Google Maps
GOOGLE_MAPS_API_KEY = config('GOOGLE_MAPS_API_KEY')
gmaps = googlemaps.Client(key=GOOGLE_MAPS_API_KEY)

def get_distance_from_google_maps(origin, destination):
    """
    Utilizează Google Maps API pentru a calcula distanța în kilometri între două locații.
    """
    try:
        # Apelăm Google Maps Directions API
        directions = gmaps.directions(origin, destination, mode="driving")
           # Afișăm răspunsul complet al API-ului
        
        # Verificăm dacă există date valide
        if directions and len(directions) > 0:
            # Extragem distanța în metri și convertim în kilometri
            distance_meters = directions[0]['legs'][0]['distance']['value']
            distance_km = distance_meters / 1000
            return round(distance_km, 2)
    except Exception as e:
        # În caz de eroare, logăm problema și returnăm 0
        print(f"Google Maps API error: {e}")
    return 0


def calculate_best_offer():
    """
    Selectează cea mai bună ofertă pe baza raportului preț/km, eliminând duplicatele
    și utilizând Google Maps pentru a completa distanțele lipsă.
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
                distance = get_distance_from_google_maps(offer.loading_location, offer.unloading_location)
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
        