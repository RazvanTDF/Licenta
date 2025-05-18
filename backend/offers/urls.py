from django.urls import path
from .views import index
from .api_views import OfferListView

urlpatterns = [
    path('', index, name='index'),  # returnează JSON cu toate ofertele + best
    path('api/offers/', OfferListView.as_view(), name='offer-list'),  # API REST
]