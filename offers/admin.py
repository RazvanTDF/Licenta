from django.contrib import admin
from .models import Offer

@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin):
    list_display = (
        'ref_number',
        'loading_location',
        'unloading_location',
        'loading_date',
        'unloading_date',
        'price',
        'recommended_price',
        'weight_kg',
        'distance_km',
        'best_offer',
        'date_received',
    )
    list_filter = ('loading_location', 'unloading_location', 'best_offer')
    search_fields = ('ref_number', 'loading_location', 'unloading_location')
    ordering = ('-date_received',)
    list_editable = ('price', 'recommended_price', 'best_offer')
