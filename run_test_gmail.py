import os
import sys
import django
import base64
import re
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
    Recunoaște termeni în română (cu și fără diacritice), engleză și spaniolă.
    Caută sintaxa: <eticheta> : <valoare>
    """
    # Sinonime mai largi (cu și fără diacritice):
    terms_mapping = {
        "loading_location": [
            r"(?:încărcare|incarcare|origin|from|origen)\s*:\s*(.+)",
            re.IGNORECASE
        ],
        "unloading_location": [
            r"(?:descărcare|descarcare|destination|destinatie|destinaţie|to|destino)\s*:\s*(.+)",
            re.IGNORECASE
        ],
        "loading_date": [
            r"(?:data\s*încărcare|data\s*încărcării|data\s*incarcare|loading\s*date|fecha\s*de\s*carga)\s*:\s*(.+)",
            re.IGNORECASE
        ],
        "unloading_date": [
            r"(?:data\s*descărcare|data\s*descărcării|data\s*descarcare|unloading\s*date|fecha\s*de\s*descarga)\s*:\s*(.+)",
            re.IGNORECASE
        ],
        "price": [
            r"(?:preț|pret|price|precio)\s*:\s*([\d.,]+)\s*(?:eur|ron|usd|euro)?",
            re.IGNORECASE
        ],
        "distance_km": [
            r"(?:distanță|distanta|distance|km|kms)\s*:\s*([\d.,]+)",
            re.IGNORECASE
        ],
        "weight_kg": [
            r"(?:greutate|weight|peso)\s*:\s*([\d.,]+)",
            re.IGNORECASE
        ],
        "cargo_details": [
            r"(?:cargo\s*details|detalii\s*mărfă|detalii\s*marfa)\s*:\s*(.+)",
            re.IGNORECASE
        ],
        "observations": [
            r"(?:observații|observatii|observations|notas)\s*:\s*(.+)",
            re.IGNORECASE
        ],
    }

    details = {}
    for key, pattern in terms_mapping.items():
        match = re.search(pattern[0], email_body, pattern[1])
        if match:
            details[key] = match.group(1).strip()

    return details


import re

def parse_price(price_str):
    """
    Convertește un preț exprimat în diferite formate într-un float corect.
    
    Acceptă:
      - 160  -> 160.00
      - 160.00  -> 160.00
      - 160,00  -> 160.00
      - 1,600.50  -> 1600.50
      - 1.600,50  -> 1600.50
      - 1 600,50  -> 1600.50 (spații ca separatori de mii)
    
    Heuristică:
      - Dacă există atât `.` cât și `,`, separatorul care apare ultimul este cel zecimal.
      - Dacă există doar `,`, verificăm dacă este separator de mii sau zecimal.
      - Dacă există doar `.`, presupunem că este separator zecimal.
    """
    try:
        # Eliminăm toate caracterele non-numerice, cu excepția `.` și `,`
        price_clean = re.sub(r"[^\d.,]", "", price_str)

        # Dacă apar AMBELE caractere (`.` și `,`), interpretăm separatorul final ca fiind zecimal
        if "." in price_clean and "," in price_clean:
            if price_clean.rfind('.') > price_clean.rfind(','):
                price_clean = price_clean.replace(',', '')  # Eliminăm `,` (separator de mii)
            else:
                price_clean = price_clean.replace('.', '').replace(',', '.')  # Eliminăm `.` și transformăm `,` în `.`
        
        # Dacă există doar `,`, determinăm dacă e separator de mii sau zecimal
        elif "," in price_clean:
            parts = price_clean.split(',')
            if len(parts[-1]) == 3:  # Dacă ultima parte are 3 cifre, e separator de mii
                price_clean = price_clean.replace(',', '')
            else:  # Altfel, e separator zecimal
                price_clean = price_clean.replace(',', '.')

        # Dacă există doar `.`, îl considerăm separator zecimal

        return round(float(price_clean), 2)
    
    except ValueError:
        print(f"⚠️ Nu s-a putut converti prețul: {price_str}")
        return 0.0  # Dacă tot nu poate converti, returnează 0.0 ca fallback


def parse_weight(weight_str):
    """
    Convertește greutatea dintr-un string în float, fără pierderi de cifre.
    Acceptă formate precum '18.700 kg', '18,700.50 kg', '18700', '18700.5'.
    
    Heuristică:
    - Dacă apar ambele caractere ('.' și ','), se consideră că separatorul
      care apare mai târziu este cel zecimal, iar celălalt este separator de mii.
    - Dacă apare doar ',' se verifică dacă separatorul este plasat astfel încât
      să indice mii (ex.: '18,700') sau zecimale (ex.: '18700,5').
    - Nu se rotunjește rezultatul; se returnează valoarea numerică completă.
    """
    try:
        # Eliminăm toate caracterele cu excepția cifrelor, punctului și virgulei
        weight_clean = re.sub(r"[^\d.,]", "", weight_str)

        if "." in weight_clean and "," in weight_clean:
            # Determinăm care separator apare mai târziu
            if weight_clean.rfind('.') > weight_clean.rfind(','):
                # Punctul este separatorul zecimal; eliminăm virgulele (separatorii de mii)
                weight_clean = weight_clean.replace(',', '')
            else:
                # Virgula este separatorul zecimal; eliminăm punctele și înlocuim virgula cu punct
                weight_clean = weight_clean.replace('.', '').replace(',', '.')
        elif "," in weight_clean:
            # Dacă apare doar virgula, determinăm rolul ei pe baza numărului de cifre după ea
            parts = weight_clean.split(',')
            if len(parts[-1]) != 3:
                # Nu avem exact 3 cifre după virgulă → virgula este separator zecimal
                weight_clean = weight_clean.replace(',', '.')
            else:
                # Altfel, virgula reprezintă separator de mii
                weight_clean = weight_clean.replace(',', '')
        # Dacă apare doar punctul, presupunem că acesta este separatorul zecimal

        return float(weight_clean)
    except ValueError:
        print(f"⚠️ Nu s-a putut converti greutatea: {weight_str}")
        return 0.0


def parse_date(date_str):
    """
    Convertește un șir de caractere într-un obiect datetime.
    Suportă multiple formate de date (cu sau fără timp).
    """
    date_formats = [
        # Cu timp (ora 12h cu AM/PM)
        "%d.%m.%Y %I:%M %p",  # 16.02.2025 08:45 AM
        "%d/%m/%Y %I:%M %p",  # 16/02/2025 08:45 AM

        # Cu timp (ora 24h)
        "%d-%m-%Y %H:%M",     # 16-02-2025 08:45
        "%Y-%m-%d %H:%M",     # 2025-02-16 08:45
        "%d.%m.%Y %H:%M",     # 16.02.2025 08:45
        "%d/%m/%Y %H:%M",     # 16/02/2025 08:45

        # Doar dată (fără timp)
        "%d.%m.%Y",           # 16.02.2025
        "%d/%m/%Y",           # 16/02/2025
        "%d-%m-%Y",           # 16-02-2025
        "%Y-%m-%d",           # 2025-02-16

        # Formate cu nume de lună (engleză)
        "%d %B %Y %H:%M",     # 16 February 2025 08:45
        "%d %b %Y %H:%M",     # 16 Feb 2025 08:45
        "%d %B %Y",           # 16 February 2025
        "%d %b %Y",           # 16 Feb 2025
    ]

    for fmt in date_formats:
        try:
            return datetime.strptime(date_str, fmt)
        except ValueError:
            pass

    print(f"Format necunoscut pentru data: {date_str}")
    return None


def process_email_advanced():
    """
    Procesează emailurile, salvează ofertele în baza de date și verifică duplicatele.
    """
    # 1. Obținem serviciul Gmail
    try:
        service = get_gmail_service()
    except Exception as e:
        print(f"Eroare la inițializarea serviciului Gmail: {e}")
        return

    # 2. Obținem ultimele mesaje (max 10)
    try:
        results = service.users().messages().list(userId='me', maxResults=10).execute()
        messages = results.get('messages', [])
    except Exception as e:
        print(f"Eroare la obținerea mesajelor: {e}")
        return

    if not messages:
        print("Nu există mesaje noi.")
        return

    # 3. Parcurgem mesajele și extragem conținutul
    for message in messages:
        try:
            msg = service.users().messages().get(userId='me', id=message['id']).execute()
            payload = msg.get('payload', {})
            data = None

            # Verificăm direct în body
            if 'data' in payload.get('body', {}):
                data = payload['body']['data']
            # Sau în part-uri, dacă emailul are mai multe secțiuni
            elif 'parts' in payload:
                for part in payload['parts']:
                    if part.get('body', {}).get('data'):
                        data = part['body']['data']
                        break

            if data:
                # Decodăm conținutul Base64
                decoded_data = base64.urlsafe_b64decode(data).decode('utf-8', errors='ignore')

                # Parsăm conținutul emailului
                details = parse_email_content(decoded_data)

                # Verificăm dacă avem locațiile de încărcare/descărcare (minim necesar)
                if details.get('loading_location') and details.get('unloading_location'):
                    loading_location = details['loading_location']
                    unloading_location = details['unloading_location']
                    distance_km = parse_weight(details.get('distance_km', '0.0'))  # idem parse_weight pt permisivitate
                    price = parse_price(details.get('price', '0.0'))
                    weight_kg = parse_weight(details.get('weight_kg', '0.0'))

                    # Separăm cargo_details și observations, dacă există
                    cargo_details = details.get('cargo_details', 'Fără detalii cargo.')
                    observations = details.get('observations', 'Nicio observație.')

                    # Convertim datele (dacă există)
                    loading_date = parse_date(details.get("loading_date", ""))
                    unloading_date = parse_date(details.get("unloading_date", ""))

                    # 4. Verificare duplicat (pe loading_location, unloading_location, price)
                    if Offer.objects.filter(
                        loading_location=loading_location,
                        unloading_location=unloading_location,
                        price=price
                    ).exists():
                        print("Această ofertă există deja în baza de date.")
                    else:
                        # 5. Salvăm oferta nouă
                        offer = Offer(
                            loading_location=loading_location,
                            unloading_location=unloading_location,
                            distance_km=distance_km,
                            price=price,
                            weight_kg=weight_kg,
                            cargo_details=cargo_details,
                            observations=observations,
                            ref_number=f"REF{datetime.now().strftime('%Y%m%d%H%M%S')}",
                            loading_date=loading_date,
                            unloading_date=unloading_date,
                        )
                        offer.save()
                        print(f"Ofertă salvată: {offer}")
                else:
                    print("Email incomplet. Lipsește locația de încărcare sau descărcare.")
            else:
                print("Email fără conținut (sau nu s-a găsit corpul mesajului).")
        except Exception as e:
            print(f"Eroare la procesarea emailului: {e}")


if __name__ == "__main__":
    try:
        process_email_advanced()
    except Exception as e:
        print(f"Eroare în execuția principală: {e}")