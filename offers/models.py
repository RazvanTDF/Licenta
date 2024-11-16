from django.db import models

# Create your models here.

class Offer(models.Model):
    loading_location = models.CharField(max_length=255)
    unloading_location = models.CharField(max_length=255)
    distance_km = models.FloatField()
    price = models.FloatField()
    date_received = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.loading_location} -> {self.unloading_location}"