from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView

urlpatterns = [
    path('api/', include('api.urls')),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('admin/', admin.site.urls),
]
