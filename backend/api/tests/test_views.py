import pytest
from django.urls import reverse
from rest_framework.test import APIClient

from api.models import Brand, Car, Category, Service


@pytest.fixture
def client():
    return APIClient()


@pytest.fixture
def brand(db):
    return Brand.objects.create(name='Toyota')


@pytest.fixture
def car(db, brand):
    return Car.objects.create(
        brand=brand,
        model='Camry',
        year=2022,
        color='white',
        body_type='sedan',
        engine_capacity=2.5,
        price=22000,
        fuel='petrol',
        transmission='automatic',
        available=True,
        is_sold=False,
        on_main_page=True,
        mileage=35000,
        description='Тестовый автомобиль',
    )


@pytest.fixture
def sold_car(db, brand):
    return Car.objects.create(
        brand=brand,
        model='Corolla',
        year=2020,
        color='black',
        body_type='sedan',
        engine_capacity=1.6,
        price=15000,
        fuel='petrol',
        transmission='manual',
        available=False,
        is_sold=True,
        on_main_page=False,
        mileage=80000,
        description='Продан',
    )


@pytest.fixture
def category_with_services(db):
    cat = Category.objects.create(name='Диагностика', name_en='Diagnostics', name_es='Diagnóstico', is_active=True)
    Service.objects.create(category=cat, name='Компьютерная диагностика', price=60)
    return cat


class TestCarListView:
    def test_returns_200(self, client, car):
        response = client.get('/api/v1/cars/')
        assert response.status_code == 200

    def test_returns_paginated_results(self, client, car):
        response = client.get('/api/v1/cars/')
        data = response.json()
        assert 'results' in data
        assert 'count' in data

    def test_car_fields_present(self, client, car):
        response = client.get('/api/v1/cars/')
        result = response.json()['results'][0]
        for field in ('brand', 'model', 'year', 'price', 'fuel', 'transmission', 'available', 'mileage'):
            assert field in result

    def test_filter_by_available(self, client, car, sold_car):
        response = client.get('/api/v1/cars/?available=true')
        results = response.json()['results']
        assert all(r['available'] for r in results)

    def test_filter_by_fuel(self, client, car):
        response = client.get('/api/v1/cars/?fuel=petrol')
        results = response.json()['results']
        assert all(r['fuel'] == 'petrol' for r in results)

    def test_filter_min_price(self, client, car, sold_car):
        response = client.get('/api/v1/cars/?min_price=20000')
        results = response.json()['results']
        assert all(r['price'] >= 20000 for r in results)

    def test_filter_max_price(self, client, car, sold_car):
        response = client.get('/api/v1/cars/?max_price=16000')
        results = response.json()['results']
        assert all(r['price'] <= 16000 for r in results)

    def test_filter_min_year(self, client, car, sold_car):
        response = client.get('/api/v1/cars/?min_year=2021')
        results = response.json()['results']
        assert all(r['year'] >= 2021 for r in results)

    def test_filter_max_year(self, client, car, sold_car):
        response = client.get('/api/v1/cars/?max_year=2021')
        results = response.json()['results']
        assert all(r['year'] <= 2021 for r in results)

    def test_sort_by_price_asc(self, client, car, sold_car):
        response = client.get('/api/v1/cars/?ordering=price')
        results = response.json()['results']
        prices = [r['price'] for r in results]
        assert prices == sorted(prices)

    def test_sort_by_price_desc(self, client, car, sold_car):
        response = client.get('/api/v1/cars/?ordering=-price')
        results = response.json()['results']
        prices = [r['price'] for r in results]
        assert prices == sorted(prices, reverse=True)


class TestCarDetailView:
    def test_returns_200(self, client, car):
        response = client.get(f'/api/v1/cars/{car.id}/')
        assert response.status_code == 200

    def test_returns_correct_car(self, client, car):
        response = client.get(f'/api/v1/cars/{car.id}/')
        data = response.json()
        assert data['model'] == 'Camry'
        assert data['year'] == 2022

    def test_returns_404_for_missing(self, client, db):
        response = client.get('/api/v1/cars/99999/')
        assert response.status_code == 404


class TestCarMainView:
    def test_returns_only_on_main_page(self, client, car, sold_car):
        response = client.get('/api/v1/cars-main/')
        assert response.status_code == 200
        results = response.json()
        assert all(r['on_main_page'] for r in results)


class TestBrandListView:
    def test_returns_200(self, client, brand):
        response = client.get('/api/v1/brands/')
        assert response.status_code == 200

    def test_returns_brand_name(self, client, brand):
        response = client.get('/api/v1/brands/')
        names = [b['name'] for b in response.json()]
        assert 'Toyota' in names


class TestServiceListView:
    def test_returns_200(self, client, category_with_services):
        response = client.get('/api/v1/services/')
        assert response.status_code == 200

    def test_returns_only_active_categories(self, client, db):
        Category.objects.create(name='Неактивная', is_active=False)
        response = client.get('/api/v1/services/')
        results = response.json()
        assert all(r['is_active'] for r in results)

    def test_services_nested_in_category(self, client, category_with_services):
        response = client.get('/api/v1/services/')
        category = response.json()[0]
        assert 'services' in category
        assert len(category['services']) > 0
