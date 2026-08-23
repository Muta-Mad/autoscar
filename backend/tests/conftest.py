import pytest

from rest_framework.test import APIClient

from api.models import Brand, Car, Category, Service


@pytest.fixture(autouse=True)
def disable_cache(settings):
    settings.CACHES = {
        'default': {'BACKEND': 'django.core.cache.backends.dummy.DummyCache'}
    }


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def brand(db):
    return Brand.objects.create(name='Toyota')


@pytest.fixture
def brand2(db):
    return Brand.objects.create(name='BMW')


@pytest.fixture
def car(db, brand):
    return Car.objects.create(
        brand=brand,
        model='Camry',
        year=2020,
        color='white',
        body_type='sedan',
        engine_capacity=2.0,
        price=25000,
        fuel='petrol',
        transmission='automatic',
        description='Тестовое описание',
        mileage=50000,
    )


@pytest.fixture
def car_main(db, brand):
    return Car.objects.create(
        brand=brand,
        model='Land Cruiser',
        year=2022,
        color='black',
        body_type='suv',
        engine_capacity=4.0,
        price=75000,
        fuel='petrol',
        transmission='automatic',
        description='SUV для главной',
        mileage=10000,
        on_main_page=True,
    )


@pytest.fixture
def category(db):
    return Category.objects.create(
        name='Техническое обслуживание',
        name_en='Technical Maintenance',
        is_active=True,
    )


@pytest.fixture
def category_inactive(db):
    return Category.objects.create(name='Неактивная', is_active=False)


@pytest.fixture
def service(db, category):
    return Service.objects.create(
        category=category,
        name='Замена масла',
        name_en='Oil Change',
        price=50,
    )
