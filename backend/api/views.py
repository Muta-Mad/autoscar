from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework.response import Response
from rest_framework.views import APIView

from api.constants import CACHE_EXPIRATION
from api.filters import CarFilterSet
from api.models import Brand, Car, Category
from api.pagination import PageNumberPagination
from api.serializer import BrandSerializer, CarSerializer, CategorySerializer


class CarListView(APIView):
    @method_decorator(cache_page(CACHE_EXPIRATION))
    def get(self, request):
        queryset = Car.objects.select_related('brand').prefetch_related('images')
        car_filter = CarFilterSet(request.query_params, queryset=queryset)
        queryset = car_filter.qs
        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(queryset, request)
        if page is not None:
            serializer = CarSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)
        serializer = CarSerializer(queryset, many=True)
        return Response(data=serializer.data)


class CarDetailView(APIView):
    @method_decorator(cache_page(CACHE_EXPIRATION))
    def get(self, request, id):
        car = get_object_or_404(
            Car.objects.select_related('brand').prefetch_related('images'), id=id
        )
        serializer = CarSerializer(car)
        return Response(data=serializer.data)


class CarMain(APIView):
    @method_decorator(cache_page(CACHE_EXPIRATION))
    def get(self, request):
        cars = Car.objects.filter(on_main_page=True).select_related('brand').prefetch_related('images')
        serializer = CarSerializer(cars, many=True)
        return Response(data=serializer.data)


class ServiceListView(APIView):
    @method_decorator(cache_page(CACHE_EXPIRATION))
    def get(self, request):
        categories = Category.objects.filter(is_active=True).prefetch_related('service')
        serializer = CategorySerializer(categories, many=True)
        return Response(data=serializer.data)


class BrandListView(APIView):
    @method_decorator(cache_page(CACHE_EXPIRATION))
    def get(self, request):
        brands = Brand.objects.all().order_by('name')
        serializer = BrandSerializer(brands, many=True)
        return Response(data=serializer.data)
