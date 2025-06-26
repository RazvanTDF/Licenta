# user/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate


class RegisterView(APIView):
    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        role = request.data.get("role", "pending")

        if not username or not email or not password:
            return Response({"error": "Toate câmpurile sunt necesare."}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username deja folosit."}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        # Setează rolul în UserProfile
        if hasattr(user, 'profile'):
            user.profile.role = role
            user.profile.save()

        return Response({"message": f"Utilizator creat cu rolul '{role}'."}, status=201)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "username": user.username,
                    "email": user.email,
                    "role": user.profile.role  # 🔥 ADĂUGAT aici
                }
            })
        return Response({"error": "Date invalide."}, status=401)



class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.profile.role,  # 🔥 aici!
            "is_staff": user.is_staff,
            "is_superuser": user.is_superuser
        })
        

from rest_framework.permissions import IsAdminUser
from user.models import UserProfile

class PendingUsersView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        pending_profiles = UserProfile.objects.filter(role='pending')
        users = [
            {
                "id": profile.user.id,
                "username": profile.user.username,
                "email": profile.user.email
            }
            for profile in pending_profiles
        ]
        return Response(users)

from django.contrib.auth.models import User
from rest_framework.permissions import IsAdminUser

class ApproveUserView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def put(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            profile = user.profile
            profile.role = 'dispecer'
            profile.save()
            return Response({"message": f"Userul {user.username} a fost aprobat ca dispecer."})
        except User.DoesNotExist:
            return Response({"error": "Userul nu există."}, status=404)
