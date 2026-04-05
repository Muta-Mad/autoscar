from django.urls import path

from api.views import CarViews

urlpatterns = [
    path('cars/', CarViews.as_view()),
]
