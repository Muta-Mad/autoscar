from django_filters import FilterSet, NumberFilter, BooleanFilter, OrderingFilter

from api.models import Car


class CarFilterSet(FilterSet):
    min_price = NumberFilter(field_name='price', lookup_expr='gte')
    max_price = NumberFilter(field_name='price', lookup_expr='lte')
    year = NumberFilter(field_name='year')
    available = BooleanFilter(field_name='available')
    ordering = OrderingFilter(
        fields=(
            ('price', 'price'),
        )
    )

    class Meta:
        model = Car
        fields = ('color', 'fuel', 'available', 'transmission', 'eco_sticker')














































# def get_filters(query_set, query_params):
#     color = query_params.get('color')
#     available = query_params.get('available')
#     engine = query_params.get('engine')
#     fuel = query_params.get('fuel')
#     price_min = query_params.get('price_min')
#     price_max = query_params.get('price_max')
#     brand = query_params.get('brand')

#     if color:
#         query_set = query_set.filter(color=color)
#     if available and available.lower() in ('true', '1'):
#         query_set = query_set.filter(available=True)
#     if engine:
#         query_set = query_set.filter(engine=engine)
#     if fuel:
#         query_set = query_set.filter(fuel=fuel)
#     if price_min:
#         try:
#             query_set = query_set.filter(price__gte=price_min)
#         except:
#             ValueError()
#     if price_max:
#         query_set = query_set.filter(price__lte=price_max)
#         try:
#             query_set = query_set.filter(price__gte=price_min)
#         except:
#             ValueError()
#     if brand:
#         query_set = query_set.filter(brand=brand)
#     return query_set
