
def get_filters(query_set, query_params):
    color = query_params.get('color')
    available = query_params.get('available')
    engine = query_params.get('engine')
    fuel = query_params.get('fuel')
    price_min = query_params.get('price_min')
    price_max = query_params.get('price_max')


    if color:
        query_set = query_set.filter(color=color)
    if available and available.lower() in ('true', '1'):
        query_set = query_set.filter(available=True)
    if engine:
        query_set = query_set.filter(engine=engine)
    if fuel:
        query_set = query_set.filter(fuel=fuel)
    if price_min:
        query_set = query_set.filter(price__gte=price_min)
    if price_max:
        query_set = query_set.filter(price__lte=price_max)
    return query_set