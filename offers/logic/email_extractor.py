from offers.models import Offer
from offers.logic.email_processor import extract_all_details
from offers.logic.email_utils import extract_text_from_payload
from offers.ai.utils import get_distance_km
from datetime import datetime



def process_and_save_email(email_text):
    # Extragem toate detaliile din email
    details = extract_all_details(email_text)

    # Verificăm minimul necesar
    if not details.get("loading_location") or not details.get("unloading_location"):
        print("⚠️ Email incomplet, lipsesc locațiile!")
        return None

    # Calculăm distanța, dacă nu e deja setată
    distance = details.get("distance_km")
    if not distance:
        distance = get_distance_km(details["loading_location"], details["unloading_location"]) or 0.0

    # Creăm oferta și salvăm
    offer = Offer(
        loading_location=details.get("loading_location"),
        unloading_location=details.get("unloading_location"),
        loading_date=details.get("loading_date"),
        unloading_date=details.get("unloading_date"),
        price=float(details.get("price") or 0.0),
        weight_kg=float(details.get("weight_kg") or 0.0),
        distance_km=float(distance),
        cargo_details="Generat automat din email",  # sau ceva default
        observations="",
        ref_number=f"REF{datetime.now().strftime('%Y%m%d%H%M%S')}"
    )
    offer.save()

    print(f"✅ Ofertă salvată: {offer}")
    return offer
