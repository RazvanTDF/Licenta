# user/utils.py
from rest_framework.permissions import BasePermission

class IsDispecer(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and hasattr(request.user, "profile")
            and request.user.profile.role == "dispecer"
        )
