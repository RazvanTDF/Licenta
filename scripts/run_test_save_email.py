# run_test_save_email.py
import os
import django

# Setăm mediul Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from offers.logic.email_extractor import process_and_save_email

# Email de test
email_text = """
Încărcare: București
Descărcare: Timișoara
Data încărcării: 15/04/2025
Data descărcării: 16/04/2025
Greutate: 1200 kg
Preț: 2500 EUR
"""

# Procesăm și salvăm oferta
process_and_save_email(email_text)
