from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # Ruta principală pentru aplicația "offers"
]
