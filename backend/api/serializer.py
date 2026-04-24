from rest_framework import serializers

from api.models import Car, CarImage


class CarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarImage
        fields = ('id', 'image')


class CarSerializer(serializers.ModelSerializer):
    images = CarImageSerializer(many=True, read_only=True)

    class Meta:
        model = Car
        fields = (
            'id', 'brand', 'model', 'year', 'color', 'body_type',
            'price', 'is_sold', 'fuel', 'transmission', 'created_at',
            'available', 'on_main_page', 'eco_sticker', 'engine_capacity',
            'mileage', 'description', 'image', 'images'
        )
