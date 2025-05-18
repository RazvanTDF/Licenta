import os
import sys
import django
import base64
import re
from gmail.service import get_gmail_service
from offers.models import Offer
from googleapiclient.errors import HttpError


print(f"Current working directory: {os.getcwd()}")
print(f"PYTHONPATH: {os.environ.get('PYTHONPATH')}")
print(f"DJANGO_SETTINGS_MODULE: {os.environ.get('DJANGO_SETTINGS_MODULE')}")

sys.path.append('/Users/razvantodor/Desktop/Licence')  # Înlocuiește cu calea ta reală
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

def process_emails():
    """Procesare email-uri și salvare în baza de date."""
    try:
        service = get_gmail_service()
        results = service.users().messages().list(userId='me', maxResults=10).execute()
        messages = results.get('messages', [])
        if not messages:
            print("No messages found.")
            return

        for message in messages:
            msg = service.users().messages().get(userId='me', id=message['id']).execute()
            payload = msg['payload']
            headers = payload['headers']

            # Extrage subiectul și expeditorul
            subject = next((header['value'] for header in headers if header['name'] == 'Subject'), None)
            sender = next((header['value'] for header in headers if header['name'] == 'From'), None)

            # Extrage corpul email-ului
            if 'data' in payload['body']:
                data = payload['body']['data']
            elif 'parts' in payload:
                data = payload['parts'][0]['body'].get('data')
            else:
                data = None

            if data:
                decoded_data = base64.urlsafe_b64decode(data).decode('utf-8')

                # Extragere informații din corpul email-ului
                match = re.search(r'From / De: (.+?)\nTo / A: (.+?)\nCargo: (.+?)\nKms: (.+?)\nObs: (.+?)\n', decoded_data)
                if match:
                    loading_location = match.group(1)
                    unloading_location = match.group(2)
                    cargo_details = match.group(3)
                    distance_km = float(match.group(4))
                    observations = match.group(5)

                    # Salvare în baza de date
                    offer = Offer(
                        loading_location=loading_location,
                        unloading_location=unloading_location,
                        cargo_details=cargo_details,
                        distance_km=distance_km,
                        observations=observations,
                        price=0.0,  # Setează un preț implicit
                    )
                    offer.save()
                    print(f"Ofertă salvată: {offer}")
                else:
                    print(f"Email ignorat: {subject}")
            else:
                print(f"Email fără conținut: {subject}")

    except HttpError as error:
        print(f"An error occurred: {error}")

if __name__ == "__main__":
    process_emails()