from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Offer
from .serializers import OfferSerializer

class OfferListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        offers = Offer.objects.all()
        serializer = OfferSerializer(offers, many=True)
        return Response(serializer.data)
