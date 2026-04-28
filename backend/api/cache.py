from django.core.cache import cache

# Время жизни кэша в секундах
CACHE_TTL_CAR_LIST = 60 * 5       # 5 минут — каталог меняется редко
CACHE_TTL_CAR_DETAIL = 60 * 10    # 10 минут — детали конкретной машины
CACHE_TTL_CAR_MAIN = 60 * 15      # 15 минут — главная страница меняется ещё реже

# Ключи кэша
CACHE_KEY_CAR_LIST = 'car_list'
CACHE_KEY_CAR_DETAIL = 'car_detail_{id}'
CACHE_KEY_CAR_MAIN = 'car_main'


def get_car_list_cache():
    return cache.get(CACHE_KEY_CAR_LIST)


def set_car_list_cache(data):
    cache.set(CACHE_KEY_CAR_LIST, data, CACHE_TTL_CAR_LIST)


def get_car_detail_cache(car_id):
    key = CACHE_KEY_CAR_DETAIL.format(id=car_id)
    return cache.get(key)


def set_car_detail_cache(car_id, data):
    key = CACHE_KEY_CAR_DETAIL.format(id=car_id)
    cache.set(key, data, CACHE_TTL_CAR_DETAIL)


def get_car_main_cache():
    return cache.get(CACHE_KEY_CAR_MAIN)


def set_car_main_cache(data):
    cache.set(CACHE_KEY_CAR_MAIN, data, CACHE_TTL_CAR_MAIN)


def invalidate_car_cache(car_id=None):
    """
    Вызывать в сигналах при сохранении/удалении Car.
    Сбрасывает список и главную всегда, детали — если передан id.
    """
    cache.delete(CACHE_KEY_CAR_LIST)
    cache.delete(CACHE_KEY_CAR_MAIN)
    if car_id:
        cache.delete(CACHE_KEY_CAR_DETAIL.format(id=car_id))
