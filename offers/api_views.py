from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Offer
from .serializers import OfferSerializer

class OfferListView(APIView):
    def get(self, request):
        offers = Offer.objects.all()
        serializer = OfferSerializer(offers, many=True)
        return Response(serializer.data)
