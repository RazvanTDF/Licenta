# offers/urls.py

from django.urls import path
from .api_views import OfferListView, OfferDetailView, OfferExportView

urlpatterns = [
    # Listă + Gmail refresh
    path("api/offers/", OfferListView.as_view(), name="offer-list"),
    # Detalii ofertă după id
    path("api/offers/<int:id>/", OfferDetailView.as_view(), name="offer-detail"),
    # Export oferte după dată
    path("api/offers/export/", OfferExportView.as_view(), name="offer-export"),
]
