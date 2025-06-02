"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.contrib import admin
from django.urls import path, include
from user.views import RegisterView, LoginView, UserProfileView
from user.views import ApproveUserView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('offers.urls')),  # păstrăm rutele de oferte
    path('api/auth/register/', RegisterView.as_view(), name='register'),
    path('api/auth/login/', LoginView.as_view(), name='login'),
    path('api/user-profile/', UserProfileView.as_view(), name='user-profile'),
    path('api/users/<int:user_id>/approve/', ApproveUserView.as_view(), name='approve-user'),
    path('api/', include('offers.urls')),
]