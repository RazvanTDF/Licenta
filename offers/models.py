from django.db import models

class Offer(models.Model):
    loading_location = models.CharField(max_length=255,blank=True, null=True)  # Locul de încărcare
    unloading_location = models.CharField(max_length=255,blank=True, null=True)  # Locul de descărcare
    loading_date = models.DateTimeField(blank=True, null=True)  # Data și ora încărcării
    unloading_date = models.DateTimeField(blank=True, null=True)  # Data și ora descărcării
    unloading_date = models.DateTimeField(blank=True, null=True)  # Data și ora descărcării
    cargo_details = models.TextField(blank=True, null=True)  # Detalii despre marfă (ex. dimensiuni, greutate)
    weight_kg = models.FloatField(default=0.0)  # Greutatea totală (kg)
    distance_km = models.FloatField(default=0.0)  # Distanța în kilometri
    observations = models.TextField(blank=True, null=True)  # Observații suplimentare (ex. Stackable: NO)
    date_received = models.DateTimeField(auto_now_add=True)  # Data primirii ofertei
    best_offer = models.BooleanField(default=False)  # Indicator pentru cea mai bună ofertă
    ref_number = models.CharField(max_length=50, unique=True, null=True)  # Număr de referință
    price = models.FloatField(default=0.0)  # Prețul ofertei

    def __str__(self):
        return f"Ref: {self.ref_number} | {self.loading_location} -> {self.unloading_location}"
