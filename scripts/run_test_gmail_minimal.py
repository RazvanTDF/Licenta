import os
import sys
import django

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.join(BASE_DIR, "backend")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
sys.path.append(BASE_DIR)

try:
    django.setup()
    print("Django este configurat corect!")

    # Testăm importul modelului
    from offers.models import Offer
    print("Modelul Offer a fost importat corect!")

    # Testăm o interogare simplă
    offers = Offer.objects.all()
    print(f"Ofertele existente: {offers}")
except Exception as e:
    print(f"Eroare detectată: {e}")
