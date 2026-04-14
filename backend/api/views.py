from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from api.serializer import CarSerializer
from api.models import Car
from api.filters import apply_car_filters


class CarListView(APIView):  # Каталог
    def get(self, request):
        queryset = apply_car_filters(Car.objects.all(), request.query_params)
        serializer = CarSerializer(queryset, many=True)
        return Response(serializer.data)

class CarDetailView(APIView):
    def get(self, request, id):
        car = get_object_or_404(Car, id=id)
        serializer = CarSerializer(car)
        return Response(data=serializer.data)


class CarMain(APIView):
    def get(self, request):
        cars = Car.objects.filter(on_main_page=True)
        serializer = CarSerializer(cars, many=True)
        return Response(data=serializer.data)
