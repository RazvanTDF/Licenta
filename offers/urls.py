from django.urls import path
from .api_views import OfferListView, OfferDetailView, OfferExportView

urlpatterns = [
    path('api/offers/', OfferListView.as_view(), name='offer-list'),
    path('api/offers/<int:id>/', OfferDetailView.as_view(), name='offer-detail'),
    path('api/offers/export/', OfferExportView.as_view(), name='offer-export'),
]
