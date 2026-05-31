import pytest

from api.models import Brand, Car, CarImage, Category, Service


@pytest.mark.django_db
class TestBrand:
    def test_create(self):
        brand = Brand.objects.create(name='Toyota')
        assert brand.name == 'Toyota'

    def test_str(self):
        assert str(Brand(name='BMW')) == 'BMW'


@pytest.mark.django_db
class TestCar:
    def test_create(self, car):
        assert car.model == 'Camry'
        assert car.year == 2020
        assert car.price == 25000
        assert car.available is True
        assert car.on_main_page is False
        assert car.is_sold is False

    def test_str(self, car):
        assert str(car) == 'Toyota Camry (2020)'

    def test_default_color_is_other(self, db, brand):
        car = Car.objects.create(
            brand=brand, model='X', year=2021, body_type='sedan',
            engine_capacity=1600, price=10000, fuel='petrol',
            transmission='manual', description='Desc', mileage=0,
        )
        assert car.color == 'other'

    def test_ordering_by_price(self, db, brand):
        Car.objects.create(
            brand=brand, model='Expensive', year=2022, body_type='suv',
            engine_capacity=3000, price=50000, fuel='petrol',
            transmission='automatic', description='D', mileage=0,
        )
        Car.objects.create(
            brand=brand, model='Cheap', year=2020, body_type='sedan',
            engine_capacity=1600, price=10000, fuel='petrol',
            transmission='manual', description='D', mileage=0,
        )
        prices = list(Car.objects.values_list('price', flat=True))
        assert prices == sorted(prices)

    def test_multilang_description(self, db, brand):
        car = Car.objects.create(
            brand=brand, model='X', year=2021, body_type='sedan',
            engine_capacity=2000, price=20000, fuel='petrol',
            transmission='automatic', description='Описание RU',
            description_en='Description EN', description_es='Descripción ES',
            mileage=0,
        )
        assert car.description_en == 'Description EN'
        assert car.description_es == 'Descripción ES'

    def test_eco_sticker_nullable(self, db, brand):
        car = Car.objects.create(
            brand=brand, model='X', year=2021, body_type='sedan',
            engine_capacity=2000, price=20000, fuel='petrol',
            transmission='automatic', description='D', mileage=0,
        )
        assert car.eco_sticker is None

    def test_cascade_delete_with_brand(self, db, brand):
        car = Car.objects.create(
            brand=brand, model='X', year=2020, body_type='sedan',
            engine_capacity=1600, price=10000, fuel='petrol',
            transmission='manual', description='D', mileage=0,
        )
        brand.delete()
        assert Car.objects.filter(pk=car.pk).count() == 0


@pytest.mark.django_db
class TestCarImage:
    def test_str(self, car):
        img = CarImage(car=car, image='cars/gallery/test.jpg')
        assert 'Camry' in str(img)

    def test_cascade_delete_with_car(self, db, car):
        img = CarImage.objects.create(car=car, image='cars/gallery/test.jpg')
        car.delete()
        assert CarImage.objects.filter(pk=img.pk).count() == 0


@pytest.mark.django_db
class TestCategory:
    def test_create(self, category):
        assert category.name == 'Техническое обслуживание'
        assert category.is_active is True

    def test_str(self, category):
        assert str(category) == 'Техническое обслуживание'

    def test_default_is_active(self, db):
        cat = Category.objects.create(name='New')
        assert cat.is_active is True

    def test_multilang_names(self, db):
        cat = Category.objects.create(
            name='Диагностика', name_en='Diagnostics', name_es='Diagnóstico',
        )
        assert cat.name_en == 'Diagnostics'
        assert cat.name_es == 'Diagnóstico'


@pytest.mark.django_db
class TestService:
    def test_create(self, service):
        assert service.name == 'Замена масла'
        assert service.price == 50

    def test_str(self, service):
        assert str(service) == 'Замена масла'

    def test_cascade_delete_with_category(self, db, category, service):
        category.delete()
        assert Service.objects.filter(pk=service.pk).count() == 0

    def test_multilang_names(self, db, category):
        svc = Service.objects.create(
            category=category,
            name='Шиномонтаж',
            name_en='Tire Service',
            name_es='Servicio de Neumáticos',
            price=30,
        )
        assert svc.name_en == 'Tire Service'
        assert svc.name_es == 'Servicio de Neumáticos'
