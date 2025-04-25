# offers/logic/email_processor.py

from offers.logic.email_utils import extract_text_from_payload
from offers.utils import parse_email_content
from offers.ai.parser import extract_offer_details_from_ai
import spacy

# Încărcăm modelul spaCy o singură dată
nlp = spacy.load("ro_core_news_sm")

def extract_all_details(email_text):
    """
    Încearcă mai întâi extragere cu regex, apoi completează câmpurile lipsă cu AI.
    """
    print("🔍 Extragere inițială cu regex...")
    details = parse_email_content(email_text)

    # Câmpuri esențiale pentru ofertă
    required_fields = ["loading_location", "unloading_location", "price", "weight_kg"]
    missing = [f for f in required_fields if not details.get(f)]

    if missing:
        print(f"⚠️ Lipsesc câmpuri: {missing} → apelăm AI-ul...")
        doc = nlp(email_text)
        ai_details = extract_offer_details_from_ai(doc)

        # Completăm doar câmpurile lipsă
        for key in missing:
            if ai_details.get(key):
                details[key] = ai_details[key]

    return details
