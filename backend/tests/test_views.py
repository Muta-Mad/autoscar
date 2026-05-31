import pytest

from api.models import Car


CARS_URL = '/api/v1/cars/'
CARS_MAIN_URL = '/api/v1/cars-main/'
BRANDS_URL = '/api/v1/brands/'
SERVICES_URL = '/api/v1/services/'


@pytest.mark.django_db
class TestCarListView:
    def test_returns_200(self, api_client, car):
        response = api_client.get(CARS_URL)
        assert response.status_code == 200

    def test_returns_paginated_response(self, api_client, car):
        data = api_client.get(CARS_URL).json()
        assert 'count' in data
        assert 'results' in data
        assert 'next' in data
        assert 'previous' in data

    def test_count_matches_db(self, api_client, car):
        data = api_client.get(CARS_URL).json()
        assert data['count'] == 1

    def test_empty_list(self, api_client, db):
        data = api_client.get(CARS_URL).json()
        assert data['count'] == 0
        assert data['results'] == []

    def test_brand_is_nested_object(self, api_client, car):
        result = api_client.get(CARS_URL).json()['results'][0]
        assert isinstance(result['brand'], dict)
        assert result['brand']['name'] == 'Toyota'

    def test_images_is_list(self, api_client, car):
        result = api_client.get(CARS_URL).json()['results'][0]
        assert isinstance(result['images'], list)

    def test_filter_min_price(self, api_client, db, brand):
        Car.objects.create(
            brand=brand, model='Cheap', year=2020, body_type='sedan',
            engine_capacity=1600, price=10000, fuel='petrol',
            transmission='manual', description='D', mileage=0,
        )
        Car.objects.create(
            brand=brand, model='Expensive', year=2022, body_type='suv',
            engine_capacity=3000, price=50000, fuel='petrol',
            transmission='automatic', description='D', mileage=0,
        )
        data = api_client.get(CARS_URL, {'min_price': 30000}).json()
        assert data['count'] == 1
        assert data['results'][0]['price'] == 50000

    def test_filter_max_price(self, api_client, db, brand):
        Car.objects.create(
            brand=brand, model='Cheap', year=2020, body_type='sedan',
            engine_capacity=1600, price=10000, fuel='petrol',
            transmission='manual', description='D', mileage=0,
        )
        Car.objects.create(
            brand=brand, model='Expensive', year=2022, body_type='suv',
            engine_capacity=3000, price=50000, fuel='petrol',
            transmission='automatic', description='D', mileage=0,
        )
        data = api_client.get(CARS_URL, {'max_price': 20000}).json()
        assert data['count'] == 1
        assert data['results'][0]['price'] == 10000

    def test_filter_min_year(self, api_client, db, brand):
        Car.objects.create(
            brand=brand, model='Old', year=2015, body_type='sedan',
            engine_capacity=1600, price=5000, fuel='petrol',
            transmission='manual', description='D', mileage=0,
        )
        Car.objects.create(
            brand=brand, model='New', year=2023, body_type='sedan',
            engine_capacity=2000, price=30000, fuel='petrol',
            transmission='automatic', description='D', mileage=0,
        )
        data = api_client.get(CARS_URL, {'min_year': 2020}).json()
        assert data['count'] == 1
        assert data['results'][0]['year'] == 2023

    def test_filter_fuel(self, api_client, db, brand):
        Car.objects.create(
            brand=brand, model='Electric', year=2023, body_type='sedan',
            engine_capacity=0, price=40000, fuel='electric',
            transmission='automatic', description='D', mileage=0,
        )
        Car.objects.create(
            brand=brand, model='Petrol', year=2020, body_type='sedan',
            engine_capacity=2000, price=20000, fuel='petrol',
            transmission='manual', description='D', mileage=0,
        )
        data = api_client.get(CARS_URL, {'fuel': 'electric'}).json()
        assert data['count'] == 1

    def test_filter_transmission(self, api_client, db, brand):
        Car.objects.create(
            brand=brand, model='Manual', year=2020, body_type='sedan',
            engine_capacity=1600, price=10000, fuel='petrol',
            transmission='manual', description='D', mileage=0,
        )
        Car.objects.create(
            brand=brand, model='Auto', year=2022, body_type='suv',
            engine_capacity=2000, price=25000, fuel='petrol',
            transmission='automatic', description='D', mileage=0,
        )
        data = api_client.get(CARS_URL, {'transmission': 'manual'}).json()
        assert data['count'] == 1

    def test_filter_available(self, api_client, db, brand):
        Car.objects.create(
            brand=brand, model='Available', year=2020, body_type='sedan',
            engine_capacity=2000, price=20000, fuel='petrol',
            transmission='manual', description='D', mileage=0, available=True,
        )
        Car.objects.create(
            brand=brand, model='Unavailable', year=2020, body_type='sedan',
            engine_capacity=2000, price=20000, fuel='petrol',
            transmission='manual', description='D', mileage=0, available=False,
        )
        data = api_client.get(CARS_URL, {'available': True}).json()
        assert data['count'] == 1
        assert data['results'][0]['available'] is True

    def test_filter_by_brand(self, api_client, db, brand, brand2):
        Car.objects.create(
            brand=brand, model='Camry', year=2020, body_type='sedan',
            engine_capacity=2000, price=25000, fuel='petrol',
            transmission='automatic', description='D', mileage=0,
        )
        Car.objects.create(
            brand=brand2, model='X5', year=2022, body_type='suv',
            engine_capacity=3000, price=60000, fuel='petrol',
            transmission='automatic', description='D', mileage=0,
        )
        data = api_client.get(CARS_URL, {'brand': brand.pk}).json()
        assert data['count'] == 1
        assert data['results'][0]['brand']['name'] == 'Toyota'

    def test_ordering_price_asc(self, api_client, db, brand):
        Car.objects.create(
            brand=brand, model='Mid', year=2021, body_type='sedan',
            engine_capacity=2000, price=30000, fuel='petrol',
            transmission='automatic', description='D', mileage=0,
        )
        Car.objects.create(
            brand=brand, model='Cheap', year=2020, body_type='sedan',
            engine_capacity=1600, price=10000, fuel='petrol',
            transmission='manual', description='D', mileage=0,
        )
        data = api_client.get(CARS_URL, {'ordering': 'price'}).json()
        prices = [item['price'] for item in data['results']]
        assert prices == sorted(prices)

    def test_ordering_price_desc(self, api_client, db, brand):
        Car.objects.create(
            brand=brand, model='Mid', year=2021, body_type='sedan',
            engine_capacity=2000, price=30000, fuel='petrol',
            transmission='automatic', description='D', mileage=0,
        )
        Car.objects.create(
            brand=brand, model='Cheap', year=2020, body_type='sedan',
            engine_capacity=1600, price=10000, fuel='petrol',
            transmission='manual', description='D', mileage=0,
        )
        data = api_client.get(CARS_URL, {'ordering': '-price'}).json()
        prices = [item['price'] for item in data['results']]
        assert prices == sorted(prices, reverse=True)


@pytest.mark.django_db
class TestCarDetailView:
    def test_returns_200(self, api_client, car):
        response = api_client.get(f'/api/v1/cars/{car.id}/')
        assert response.status_code == 200

    def test_returns_correct_car(self, api_client, car):
        data = api_client.get(f'/api/v1/cars/{car.id}/').json()
        assert data['model'] == 'Camry'
        assert data['year'] == 2020
        assert data['price'] == 25000

    def test_returns_404_for_missing(self, api_client, db):
        response = api_client.get('/api/v1/cars/99999/')
        assert response.status_code == 404

    def test_brand_is_nested(self, api_client, car):
        data = api_client.get(f'/api/v1/cars/{car.id}/').json()
        assert isinstance(data['brand'], dict)
        assert data['brand']['name'] == 'Toyota'

    def test_images_field_present(self, api_client, car):
        data = api_client.get(f'/api/v1/cars/{car.id}/').json()
        assert isinstance(data['images'], list)

    def test_all_text_fields_present(self, api_client, car):
        data = api_client.get(f'/api/v1/cars/{car.id}/').json()
        assert 'description' in data
        assert 'description_en' in data
        assert 'description_es' in data


@pytest.mark.django_db
class TestCarMainView:
    def test_returns_200(self, api_client, db):
        response = api_client.get(CARS_MAIN_URL)
        assert response.status_code == 200

    def test_returns_only_main_cars(self, api_client, car, car_main):
        data = api_client.get(CARS_MAIN_URL).json()
        assert len(data) == 1
        assert data[0]['on_main_page'] is True

    def test_excludes_non_main(self, api_client, car):
        data = api_client.get(CARS_MAIN_URL).json()
        assert data == []

    def test_empty_when_no_main_cars(self, api_client, db):
        data = api_client.get(CARS_MAIN_URL).json()
        assert data == []


@pytest.mark.django_db
class TestServiceListView:
    def test_returns_200(self, api_client, db):
        response = api_client.get(SERVICES_URL)
        assert response.status_code == 200

    def test_only_active_categories(self, api_client, category, category_inactive, service):
        data = api_client.get(SERVICES_URL).json()
        assert len(data) == 1
        assert data[0]['name'] == 'Техническое обслуживание'

    def test_services_nested_in_category(self, api_client, category, service):
        data = api_client.get(SERVICES_URL).json()
        assert len(data[0]['services']) == 1
        assert data[0]['services'][0]['name'] == 'Замена масла'
        assert data[0]['services'][0]['price'] == 50

    def test_inactive_excluded(self, api_client, category_inactive):
        data = api_client.get(SERVICES_URL).json()
        assert data == []

    def test_empty_active_category(self, api_client, category):
        data = api_client.get(SERVICES_URL).json()
        assert len(data) == 1
        assert data[0]['services'] == []

    def test_multilang_fields(self, api_client, category):
        data = api_client.get(SERVICES_URL).json()
        cat = data[0]
        assert 'name' in cat
        assert 'name_en' in cat
        assert 'name_es' in cat


@pytest.mark.django_db
class TestBrandListView:
    def test_returns_200(self, api_client, db):
        response = api_client.get(BRANDS_URL)
        assert response.status_code == 200

    def test_returns_all_brands(self, api_client, brand, brand2):
        data = api_client.get(BRANDS_URL).json()
        assert len(data) == 2

    def test_ordered_by_name(self, api_client, brand, brand2):
        data = api_client.get(BRANDS_URL).json()
        names = [b['name'] for b in data]
        assert names == sorted(names)

    def test_empty_list(self, api_client, db):
        data = api_client.get(BRANDS_URL).json()
        assert data == []

    def test_name_field_present(self, api_client, brand):
        data = api_client.get(BRANDS_URL).json()
        assert 'name' in data[0]
