from rest_framework.views import APIView
from rest_framework.response import Response

from api.serializer import CarSerializer
from api.models import Car

class CarViews(APIView):
    def get(self, request):
        cars = Car.objects.all()
        seriaizer = CarSerializer(cars, many=True)
        return Response(data=seriaizer.data)
