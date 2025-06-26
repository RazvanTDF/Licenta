from rest_framework import serializers
from .models import Offer

class OfferSerializer(serializers.ModelSerializer):
    recommended_price = serializers.SerializerMethodField()

    class Meta:
        model = Offer
        fields = '__all__'  # asta include toate câmpurile din model + cel de mai jos

    def get_recommended_price(self, obj):
        return getattr(obj, 'recommended_price', None)
