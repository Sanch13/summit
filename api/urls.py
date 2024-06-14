from django.urls import path, include

from api.spectacular.urls import urlpatterns as doc_urls
from users.utils import validate_password

app_name = 'api'

urlpatterns = [
    path('auth/', include('djoser.urls.jwt')),
    path('check_pswd/', validate_password),
]

urlpatterns += doc_urls
