from rest_framework import serializers

from api.models import Car, CarImage, Category, Service, Brand


class CarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarImage
        fields = ('image',)


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ('name',)


class CarSerializer(serializers.ModelSerializer):
    images = CarImageSerializer(many=True, read_only=True)
    brand = BrandSerializer(read_only=True)

    class Meta:
        model = Car
        fields = (
            'brand',
            'model',
            'year',
            'color',
            'body_type',
            'price',
            'is_sold',
            'fuel',
            'transmission',
            'created_at',
            'available',
            'on_main_page',
            'eco_sticker',
            'engine_capacity',
            'mileage',
            'description',
            'description_en',
            'description_es',
            'image',
            'images',
        )


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ('name', 'name_en', 'name_es', 'price', 'category')


class CategorySerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True, source='service')

    class Meta:
        model = Category
        fields = ('name', 'name_en', 'name_es', 'is_active', 'services')
