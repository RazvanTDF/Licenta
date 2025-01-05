from django.contrib import admin
from .models import Offer

@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin):
    list_display = ('ref_number', 'loading_location', 'unloading_location', 'price', 'weight_kg', 'distance_km', 'best_offer')
    list_editable = ('price',)  # Poți edita direct în listă
