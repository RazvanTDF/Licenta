# run_test_save_emails.py

import os
import django

# 🛠️ Setăm mediul Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from offers.logic.email_extractor import process_and_save_email

# Lista de emailuri de test
emails = [
    """
    Încărcare: București
    Descărcare: Cluj-Napoca
    Data încărcării: 01/05/2025
    Data descărcării: 02/05/2025
    Greutate: 800 kg
    Preț: 2200 EUR
    """,
    """
    Încărcare: Constanța
    Descărcare: Brașov
    Data încărcării: 03/05/2025
    Data descărcării: 04/05/2025
    Greutate: 1500 kg
    Preț: 3000 EUR
    """,
    """
    Încărcare: Iași
    Descărcare: Oradea
    Data încărcării: 05/05/2025
    Data descărcării: 06/05/2025
    Greutate: 700 kg
    Preț: 2100 EUR
    """,
    """
    Încărcare: Timișoara
    Descărcare: Ploiești
    Data încărcării: 07/05/2025
    Data descărcării: 08/05/2025
    Greutate: 950 kg
    Preț: 2500 EUR
    """,
    """
    Încărcare: Craiova
    Descărcare: Sibiu
    Data încărcării: 09/05/2025
    Data descărcării: 10/05/2025
    Greutate: 1000 kg
    Preț: 2700 EUR
    """
]

print("🚀 Începem procesarea emailurilor...\n")

for idx, email_text in enumerate(emails, 1):
    print(f"📩 Procesăm emailul #{idx}...")
    process_and_save_email(email_text)
    print("-" * 40)

print("\n✅ Procesare terminată.")
