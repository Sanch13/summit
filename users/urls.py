from django.urls import path

from .views import registration, profile
from . import views

app_name = "users"

urlpatterns = [
    path("profile/", profile, name='profile'),
    path("registration/", views.UserRegistrationView.as_view(), name='registration'),
]
