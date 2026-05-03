import time

from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core.cache import cache



from api.serializer import CarSerializer, CategorySerializer
from api.models import Car, Category
from api.filters import CarFilterSet
from api.pagination import PageNumberPagination


class CarListView(APIView):
    def get(self, request):
        cache_data = cache.get('car_list')
        if cache_data:
            print('данные в кеше молниеносный ответ!')
            return Response(data=cache_data)
        print('кеш пуст идем в базу!')
        time.sleep(5)# имитация нагрузки
        queryset = Car.objects.select_related('brand').prefetch_related('images')
        car_filter = CarFilterSet(request.query_params, queryset=queryset)
        queryset = car_filter.qs
        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(queryset, request)
        if page is not None:
            serializer = CarSerializer(page, many=True)
            print('записываем данные в кеш с пагинацией')
            cache.set('car_list', serializer.data, timeout=60)
            return paginator.get_paginated_response(serializer.data)    
        serializer = CarSerializer(queryset, many=True)
        print('сохраняем данные в кэш')
        cache.set('car_list', serializer.data, timeout=60)
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
