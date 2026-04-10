from rest_framework import serializers

from api.models import Car

class CarSerializer(serializers.ModelSerializer):

    class Meta:
        model = Car
        fields = (
            'id', 'brand', 'model', 'year', 'color', 'body_type', 
            'engine', 'price', 'is_sold', 'fuel', 'transmission', 'created_at', 'available'
        )