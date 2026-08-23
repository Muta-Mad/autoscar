from django.contrib import admin
from django.urls import include, path


urlpatterns = [path('adminka/', admin.site.urls), path('api/v1/', include('api.urls'))]
