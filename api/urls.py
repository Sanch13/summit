from django.urls import path, include

from api.spectacular.urls import urlpatterns as doc_urls
from users.utils import validate_password, check_email, check_phone_number

app_name = 'api'

urlpatterns = [
    path('auth/', include('djoser.urls.jwt')),
    path('check-password/', validate_password),
    path('check-email', check_email),
    path('check_phone', check_phone_number),

]

urlpatterns += doc_urls
