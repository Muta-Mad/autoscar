from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from api.serializer import CarSerializer
from api.models import Car


class CarListView(APIView):# Каталог
    def get(self, request):
        query_set = Car.objects.all()
        color = request.query_params.get('color')
        available = request.query_params.get('available')
        valid_available = [True, False]
        
        if color:
            query_set = query_set.filter(color=color)
            serialazer = CarSerializer(query_set, many=True)
            return Response(serialazer.data)
        if available and valid_available:
            query_set = query_set.filter(available=available)
            serialazer = CarSerializer(query_set, many=True)
            return Response(serialazer.data)

        else:
            serialazer = CarSerializer(query_set, many=True)
            return Response(serialazer.data)

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
