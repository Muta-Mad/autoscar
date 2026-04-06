from django.urls import path

from api.views import CarListView, CarDetailView, CarMain

urlpatterns = [
    path('cars/', CarListView.as_view()),
    path('cars/<int:id>/', CarDetailView.as_view()),
    path('cars-main/', CarMain.as_view()),
]
