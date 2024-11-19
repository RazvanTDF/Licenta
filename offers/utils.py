from .models import Offer

def calculate_best_offer():
    # Preluăm toate ofertele existente
    offers = Offer.objects.all()

    # Resetăm câmpul `best_offer` pentru toate ofertele
    Offer.objects.update(best_offer=False)

    # Filtrăm duplicatele în funcție de locațiile de încărcare și descărcare
    unique_offers = {}
    for offer in offers:
        # Cheie unică bazată pe locațiile de încărcare și descărcare
        key = (offer.loading_location, offer.unloading_location)
        if key not in unique_offers:
            unique_offers[key] = offer
        else:
            # Dacă există deja o ofertă cu aceleași locații, ignorăm
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