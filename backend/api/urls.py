from django.urls import path
from django.conf import settings
from django.conf.urls.static import static


from api.views import CarListView, CarDetailView, CarMain

urlpatterns = [
    path('cars/', CarListView.as_view()),
    path('cars/<int:id>/', CarDetailView.as_view()),
    path('cars-main/', CarMain.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
