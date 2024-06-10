from django.urls import path

from .views import registration, profile

app_name = "users"

urlpatterns = [
    path("registration/", registration, name='registration'),
    path("profile/", profile, name='profile'),
]
