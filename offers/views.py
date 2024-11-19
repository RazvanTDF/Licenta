from django.http import JsonResponse
from .models import Offer

def index(request):
    offers = Offer.objects.all().values()
    best_offers = Offer.objects.filter(best_offer=True).values()
    return JsonResponse({
        "all_offers": list(offers),
        "best_offers": list(best_offers),
    }, safe=False)
