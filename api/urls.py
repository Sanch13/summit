from django.urls import path, include

from api.spectacular.urls import urlpatterns as doc_urls
from . import api_views

app_name = 'api'

urlpatterns = [
    path('auth/', include('djoser.urls.jwt')),
    path('check-password/', api_views.CommonPasswordCheckAPIView.as_view()),
    path('check-email/', api_views.EmailCheckAPIView.as_view()),
    path('check-phone/', api_views.PhoneNumberCheckAPIView.as_view()),

]

urlpatterns += doc_urls
