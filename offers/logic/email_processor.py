# offers/logic/email_processor.py
from offers.ai.parser import extract_offer_details_from_ai
from offers.utils import parse_email_content  # vechiul regex
import spacy

nlp = spacy.load("ro_core_news_sm")

def extract_all_details(email_text):
    """
    Încearcă mai întâi extragere cu regex, apoi completează ce lipsește cu AI.
    """
    print("🔍 Extragere inițială cu regex...")
    details = parse_email_content(email_text)

    # Dacă lipsesc locațiile sau datele importante, apelăm AI-ul
    required_fields = ["loading_location", "unloading_location", "price", "weight_kg"]
    missing = [f for f in required_fields if not details.get(f)]

    if missing:
        print(f"⚠️ Lipsesc câmpuri: {missing} → apelăm AI-ul...")
        doc = nlp(email_text)
        ai_details = extract_offer_details_from_ai(doc)

        for key in missing:
            if ai_details.get(key):
                details[key] = ai_details[key]

    return details
