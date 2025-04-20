import spacy
from .utils import (
    parse_price_ai,
    parse_weight_ai,
    parse_date_ai,
    is_valid_location,
    get_distance_km,
    extract_offer_details_from_ai
)

print("\n🚀 Pornim testul AI...")

nlp = spacy.load("ro_core_news_sm")

email_text = """
Încărcare: București
Descărcare: Timișoara
Data încărcării: 15/04/2025
Data descărcării: 16/04/2025
Greutate: 1200 kg
Preț: 2500 EUR
"""

doc = nlp(email_text)
details = extract_offer_details_from_ai(doc)

print("\n📦 Detalii extrase de AI:")
for k, v in details.items():
    print(f"{k:<20}: {v}")

if details["loading_location"] and details["unloading_location"]:
    distance = get_distance_km(details["loading_location"], details["unloading_location"])
    print(f"\n📍 Distanța între locații: {distance} km")
