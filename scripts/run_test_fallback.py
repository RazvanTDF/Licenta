from offers.logic.email_processor import extract_all_details

email = """
Încărcare: București
Descărcare: Timișoara
Data încărcării: 15/04/2025
Data descărcării: 16/04/2025
Greutate: 1200 kg
Preț: 2500 EUR
"""

details = extract_all_details(email)

print("\n📦 Detalii extrase complet:")
for k, v in details.items():
    print(f"{k:<20}: {v}")
