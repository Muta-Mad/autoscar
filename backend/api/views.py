from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from api.serializer import CarSerializer, CategorySerializer
from api.models import Car, Category
from api.filters import CarFilterSet
from api.pagination import CarPagination


class CarListView(APIView):# Каталог
    def get(self, request):
        query_set = Car.objects.select_related('brand').prefetch_related('images')
        query_params = request.query_params
        if query_params:
            query_set = CarFilterSet(query_params, queryset=query_set)
            query_set = query_set.qs

        paginator = CarPagination()
        page = paginator.paginate_queryset(query_set, request)
        if page is not None:
            serializer = CarSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)

        serializer = CarSerializer(query_set, many=True)
        return Response(data=serializer.data)



class CarDetailView(APIView):
    def get(self, request, id):
        car = get_object_or_404(Car, id=id)
        serializer = CarSerializer(car)
        return Response(data=serializer.data)


class CarMain(APIView):
    def get(self, request):
        cars = Car.objects.filter(on_main_page=True).select_related('brand').prefetch_related('images')
        serializer = CarSerializer(cars, many=True)
        return Response(data=serializer.data)


class CategoryListView(APIView):
    def get(self, request):
        categories = Category.objects.filter(is_active=True).prefetch_related('service_set')
        serializer = CategorySerializer(categories, many=True)
        return Response(data=serializer.data)
