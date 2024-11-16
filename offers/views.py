from django.http import JsonResponse
from .models import Offer
# Create your views here.
def index(request):
    offers = Offer.objects.all().values()
    return JsonResponse(list(offers), safe=False)
