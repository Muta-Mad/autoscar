from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from api.serializer import CarSerializer
from api.models import Car


class CarListView(APIView):# Каталог
    def get(self, request):
        cars = Car.objects.all()
        serialazer = CarSerializer(cars, many=True)
        return Response(data=serialazer.data)


class CarDetailView(APIView):
    def get(self, request, id):
        car = get_object_or_404(Car, id=id)
        serialazer = CarSerializer(car)
        return Response(data=serialazer.data)


class CarMain(APIView):
    def get(self, request):
        cars = Car.objects.filter(on_main_page=True)
        serialazer = CarSerializer(cars, many=True)
        return Response(data=serialazer.data)
