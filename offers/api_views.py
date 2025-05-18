# offers/api_views.py
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, CharFilter, BooleanFilter
from .models import Offer
from .serializers import OfferSerializer
from rest_framework.generics import RetrieveAPIView
from .models import Offer
from rest_framework.views import APIView
from django.http import JsonResponse
from django.utils.dateparse import parse_date
from rest_framework.permissions import IsAuthenticated
from user.utils import IsDispecer

class OfferFilter(FilterSet):
    loading_location = CharFilter(field_name='loading_location', lookup_expr='icontains')
    unloading_location = CharFilter(field_name='unloading_location', lookup_expr='icontains')
    best_offer = BooleanFilter(field_name='best_offer')

    class Meta:
        model = Offer
        fields = ['loading_location', 'unloading_location', 'best_offer']

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class OfferListView(ListAPIView):
    queryset = Offer.objects.all().order_by('-date_received')
    serializer_class = OfferSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = OfferFilter
    ordering_fields = ['date_received', 'price', 'distance_km']
    ordering = ['-date_received']
    
class OfferDetailView(RetrieveAPIView):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer
    lookup_field = 'id'  # Căutăm după ID-ul ofertei (cheia primară)

class OfferExportView(APIView):
    permission_classes = [IsAuthenticated, IsDispecer]
    def get(self, request):
        date_str = request.query_params.get('date')

        if not date_str:
            return JsonResponse({'error': 'Parametrul "date" este necesar. Ex: ?date=2025-05-19'}, status=400)

        try:
            target_date = parse_date(date_str)
            if not target_date:
                raise ValueError
        except ValueError:
            return JsonResponse({'error': 'Formatul datei este invalid. Folosește YYYY-MM-DD.'}, status=400)

        offers = Offer.objects.filter(date_received__date=target_date)
        serializer = OfferSerializer(offers, many=True)
        return JsonResponse(serializer.data, safe=False)
