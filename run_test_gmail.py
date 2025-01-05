import os
import sys
import django
import base64
from datetime import datetime

# Configurare Django
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

from offers.models import Offer
from offers.gmail_service import get_gmail_service


def parse_email_content(email_body):
    """
    Parsează corpul emailului și returnează informațiile extrase.
    """
    details = {}
    for line in email_body.splitlines():
        if ":" in line:
            key, value = line.split(":", 1)
            details[key.strip().lower()] = value.strip()
    return details


def parse_price(price_str):
    """
    Curăță și convertește o valoare de preț dintr-un șir de caractere în float.
    Exemplu: '200 RON' -> 200.0
    """
    try:
        # Eliminăm orice text care nu este cifră sau punct
        price_clean = ''.join(char for char in price_str if char.isdigit() or char == '.')
        return float(price_clean)
    except ValueError:
        print(f"Nu s-a putut converti prețul: {price_str}")
        return 0.0  # Valoare implicită dacă prețul este invalid


def process_email_minimal():
    """
    Extrage emailurile și salvează ofertele, chiar dacă distanța și prețul lipsesc.
    """
    try:
        service = get_gmail_service()
    except Exception as e:
        print(f"Eroare la inițializarea serviciului Gmail: {e}")
        return

    try:
        results = service.users().messages().list(userId='me', maxResults=1).execute()
        messages = results.get('messages', [])
    except Exception as e:
        print(f"Eroare la obținerea mesajelor: {e}")
        return

    if not messages:
        print("Nu există mesaje noi.")
        return

    # Procesăm doar primul email
    for message in messages:
        try:
            msg = service.users().messages().get(userId='me', id=message['id']).execute()
            payload = msg.get('payload', {})
            data = None

            if 'data' in payload.get('body', {}):
                data = payload['body']['data']
            elif 'parts' in payload:
                for part in payload['parts']:
                    if part.get('body', {}).get('data'):
                        data = part['body']['data']
                        break

            if data:
                decoded_data = base64.urlsafe_b64decode(data).decode('utf-8')
                details = parse_email_content(decoded_data)

                # Verificăm dacă locațiile sunt prezente (esențiale pentru salvare)
                if 'locație de încărcare' in details and 'locație de descărcare' in details:
                    loading_location = details['locație de încărcare']
                    unloading_location = details['locație de descărcare']

                    # Setăm distanța și prețul ca opționale
                    distance_km = int(details.get('distanță', 0))  # Implicit 0 dacă lipsește
                    price = parse_price(details.get('preț', '0.0'))  # Curățăm și convertim prețul
                    observations = details.get('observații', 'Nicio observație.')

                    # Verificăm dacă oferta există deja
                    if Offer.objects.filter(
                        loading_location=loading_location,
                        unloading_location=unloading_location,
                        price=price
                    ).exists():
                        print("Această ofertă există deja în baza de date.")
                    else:
                        # Creează și salvează oferta
                        offer = Offer(
                            loading_location=loading_location,
                            unloading_location=unloading_location,
                            distance_km=distance_km,
                            price=price,
                            observations=observations,
                            cargo_details="Detalii extrase din email",
                            ref_number=f"REF{datetime.now().strftime('%Y%m%d%H%M%S')}",
                            unloading_date=datetime.now()  # Setăm data curentă
                        )
                        offer.save()
                        print(f"Ofertă salvată: {offer}")
                else:
                    print("Email incomplet. Lipsește locația de încărcare sau descărcare.")
            else:
                print("Email fără conținut.")
        except Exception as e:
            print(f"Eroare la procesarea emailului: {e}")


if __name__ == "__main__":
    try:
        process_email_minimal()
    except Exception as e:
        print(f"Eroare în execuția principală: {e}")
