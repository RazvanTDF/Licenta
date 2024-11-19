from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Offer
from .utils import calculate_best_offer
from django.db.models import signals
from .models import Offer

@receiver(post_save, sender=Offer)
def update_best_offer(sender, instance, **kwargs):
    # Dezactivează semnalul pentru a evita recursiunea
    post_save.disconnect(update_best_offer, sender=Offer)
    
    # Apelează funcția calculate_best_offer
    calculate_best_offer()

    # Reactivare semnal
    post_save.connect(update_best_offer, sender=Offer)