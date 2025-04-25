# run_test_emails.py

import os
import sys
import django

# 🔧 Configurare Django (pentru ca să putem importa offers)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.join(BASE_DIR, 'backend')
sys.path.append(BASE_DIR)
sys.path.append(PROJECT_DIR)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

try:
    django.setup()
except Exception as e:
    print(f"Eroare la configurarea Django: {e}")
    sys.exit(1)

from offers.logic.email_extractor import extract_text_from_payload
from offers.logic.email_processor import extract_all_details

# 🧪 Simulare: payload de test (ca și cum ar veni de la Gmail API)
import base64

sample_email_text = """
Încărcare: București
Descărcare: Timișoara
Data încărcării: 15/04/2025
Data descărcării: 16/04/2025
Greutate: 1200 kg
Preț: 2500 EUR
"""

# Simulăm codificarea base64 exact ca Gmail
encoded_data = base64.urlsafe_b64encode(sample_email_text.encode('utf-8')).decode('utf-8')

payload = {
    "body": {
        "data": encoded_data
    }
}

# 📨 Extragem textul emailului
print("📩 Extragem textul emailului...")
email_text = extract_text_from_payload(payload)

if email_text:
    print("\n--- Conținut email decodat ---")
    print(email_text)

    # 🧠 Procesăm emailul pentru a extrage detaliile
    print("\n🔍 Procesăm emailul...")
    details = extract_all_details(email_text)

    print("\n📦 Detalii extrase final:")
    for k, v in details.items():
        print(f"{k:<20}: {v}")
else:
    print("❌ Nu s-a putut extrage textul din payload.")
