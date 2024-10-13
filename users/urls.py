from django.urls import path

from .views import registration, profile
from . import views

app_name = "users"

urlpatterns = [
    path("registration/", views.UserRegistrationView.as_view(), name='registration'),
    path("profile/", profile, name='profile'),
]
