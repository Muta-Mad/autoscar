def apply_car_filters(queryset, params):
    # Словарь. параметр запроса -> ORM-lookup для фильтрации
    # brand использует icontains для поиска без учёта регистра
    # year_min/year_max и price_min/price_max задают диапазон значений
    text_filters = {
        'color': 'color',
        'brand': 'brand__icontains',
        'body_type': 'body_type',
        'fuel': 'fuel',
        'transmission': 'transmission',
        'eco_sticker': 'eco_sticker',
    }

    # Числовые параметры — приводим к int для надёжности,
    # так как query_params всегда возвращает строки
    int_filters = {
        'year_min': 'year__gte',
        'year_max': 'year__lte',
        'price_min': 'price__gte',
        'price_max': 'price__lte',
    }

    # Перебираем текстовые фильтры
    for param, lookup in text_filters.items():
        value = params.get(param)
        if value is not None and value != '':
            queryset = queryset.filter(**{lookup: value})

    # Перебираем числовые фильтры.
    # Если значение не является числом — пропускаем, чтобы не упасть с ошибкой.
    for param, lookup in int_filters.items():
        value = params.get(param)
        if value is not None and value != '':
            try:
                # Динамически передаём lookup в filter(), например: filter(year__gte=2018)
                queryset = queryset.filter(**{lookup: int(value)})
            except ValueError:
                # Пропускаем некорректное значение, например ?year_min=abc
                pass

    # Отдельно обрабатываем булевы параметры available и is_sold,
    # так как строку 'true'/'false' нужно привести к типу bool перед фильтрацией.
    for param in ('available', 'is_sold'):
        value = params.get(param)
        if value is not None:
            # Приводим строку к bool: 'true' -> True, всё остальное -> False
            queryset = queryset.filter(**{param: value.lower() == 'true'})

    return queryset
