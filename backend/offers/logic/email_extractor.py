from offers.models import Offer
from offers.logic.email_processor import extract_all_details
from offers.logic.email_utils import extract_text_from_payload, estimate_price
from offers.ai.utils import get_distance_km
from django.utils.timezone import make_aware
from datetime import datetime

def process_and_save_email(payload):
    email_text = extract_text_from_payload(payload)

    if not isinstance(email_text, str) or not email_text.strip():
        print("⚠️ Email body invalid (nu este text). Ignorăm acest email.")
        return

    details = extract_all_details(email_text)

    if not details.get("loading_location") or not details.get("unloading_location"):
        print("⚠️ Email incomplet, lipsesc locațiile!")
        return

    distance = details.get("distance_km") or get_distance_km(
        details["loading_location"],
        details["unloading_location"]
    ) or 0.0

    weight = float(details.get("weight_kg") or 0.0)
    price = details.get("price")
    
    recommended_price = None
    if not price:
        recommended_price = estimate_price(weight, distance)

    loading_date = details.get("loading_date")
    if loading_date:
        try:
            loading_date = make_aware(loading_date)
        except Exception:
            pass

    unloading_date = details.get("unloading_date")
    if unloading_date:
        try:
            unloading_date = make_aware(unloading_date)
        except Exception:
            pass

    offer = Offer(
        loading_location=details.get("loading_location"),
        unloading_location=details.get("unloading_location"),
        loading_date=loading_date,
        unloading_date=unloading_date,
        price=float(price) if price else 0.0,
        recommended_price=recommended_price,
        weight_kg=weight,
        distance_km=distance,
        cargo_details="Generat automat din email",
        observations="",
        ref_number=f"REF{datetime.now().strftime('%Y%m%d%H%M%S')}"
    )
    offer.save()
    print(f"✅ Ofertă salvată: {offer}")
