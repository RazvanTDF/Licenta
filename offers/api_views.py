# offers/api_views.py

import os
import sys
import subprocess
from rest_framework.generics import RetrieveDestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.generics import RetrieveAPIView

from .models import Offer
from .serializers import OfferSerializer

# --- Configurare calea către script ---
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPTS_DIR = os.path.join(BASE_DIR, "scripts")
RUN_SCRIPT_PATH = os.path.join(SCRIPTS_DIR, "run_test_gmail.py")


class OfferListView(APIView):
    """
    La GET, dacă există ?run_gmail=1, rulează mai întâi run_test_gmail.py, apoi returnează
    toate ofertele. Dacă nu e ?run_gmail=1, trimite pur și simplu toate ofertele.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        run_gmail_flag = request.GET.get("run_gmail")
        if run_gmail_flag == "1":
            print("🔄 Cerere cu ?run_gmail=1 – lansez run_test_gmail.py ...")
            try:
                python_exec = sys.executable
                result = subprocess.run(
                    [python_exec, RUN_SCRIPT_PATH],
                    cwd=BASE_DIR,
                    capture_output=True,
                    text=True,
                    timeout=300,  # până la 5 minute
                )
                print("▶ run_test_gmail.py stdout:\n", result.stdout)
                if result.stderr:
                    print("▶ run_test_gmail.py stderr:\n", result.stderr)
                print("✔️ run_test_gmail.py s-a terminat, cod de exit:", result.returncode)
            except Exception as e:
                print(f"❌ Eroare la rularea run_test_gmail.py: {e}")

        # După rularea scriptului (sau dacă nu a fost ?run_gmail=1), aducem toate ofertele:
        offers = Offer.objects.all().order_by("-date_received")
        serializer = OfferSerializer(offers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OfferDetailView(RetrieveDestroyAPIView):
    """
    Returnează detaliile unei singure oferte (GET) și permite ștergerea ei (DELETE) după id.
    """
    permission_classes = [IsAuthenticated]
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer
    lookup_field = "id"

class OfferExportView(APIView):
    """
    Endpoint de export după dată: ?date=YYYY-MM-DD
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        date_str = request.query_params.get("date")
        if not date_str:
            return Response(
                {"error": 'Parametrul "date" este necesar. Ex: ?date=2025-05-19'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        from django.utils.dateparse import parse_date

        try:
            target_date = parse_date(date_str)
            if not target_date:
                raise ValueError
        except ValueError:
            return Response(
                {"error": 'Formatul datei este invalid. Folosește YYYY-MM-DD.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        offers = Offer.objects.filter(date_received__date=target_date)
        serializer = OfferSerializer(offers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
