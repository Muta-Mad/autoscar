from django_filters import FilterSet, NumberFilter, BooleanFilter, OrderingFilter, ModelChoiceFilter

from api.models import Car, Brand


class CarFilterSet(FilterSet):
    min_price = NumberFilter(field_name='price', lookup_expr='gte')
    max_price = NumberFilter(field_name='price', lookup_expr='lte')
    brand = ModelChoiceFilter(field_name='brand', queryset=Brand.objects.all())
    ordering = OrderingFilter(
        fields=(
            ('price', 'price'),
        )
    )

    class Meta:
        model = Car
        fields = ('color', 'fuel', 'available', 'transmission', 'eco_sticker', 'brand', 'year')
