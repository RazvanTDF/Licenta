# user/models.py
from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('dispecer', 'Dispecer'),
        ('vizitator', 'Vizitator'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='vizitator')

    def __str__(self):
        return f"{self.user.username} - {self.role}"
