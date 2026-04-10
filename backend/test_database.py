import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'autoscar.settings')
django.setup()

from django.contrib.auth.models import User
from api.models import Car

if not User.objects.filter(username='root').exists():
    User.objects.create_superuser(username='root', password='root', email='')
    print('Суперюзер root создан')
else:
    print('Суперюзер root уже существует')

if not User.objects.filter(username='test').exists():
    User.objects.create_user(username='test', password='test', email='')
    print('Юзер test создан')
else:
    print('Юзер test уже существует')

if Car.objects.count() == 0:
    cars = [
        {'brand': 'Toyota', 'model': 'Camry', 'year': 2018, 'color': 'white',
         'body_type': 'sedan', 'engine': '2.5 AT', 'price': 18000,
         'fuel': 'petrol', 'transmission': 'automatic'},
        {'brand': 'BMW', 'model': 'X5', 'year': 2019, 'color': 'black',
         'body_type': 'suv', 'engine': '3.0 AT', 'price': 35000,
         'fuel': 'diesel', 'transmission': 'automatic'},
        {'brand': 'Volkswagen', 'model': 'Golf', 'year': 2017, 'color': 'gray',
         'body_type': 'hatchback', 'engine': '1.6 MT', 'price': 12000,
         'fuel': 'petrol', 'transmission': 'manual'},
        {'brand': 'Honda', 'model': 'CR-V', 'year': 2020, 'color': 'silver',
         'body_type': 'crossover', 'engine': '1.5 AT', 'price': 22000,
         'fuel': 'petrol', 'transmission': 'automatic'},
        {'brand': 'Ford', 'model': 'Focus', 'year': 2016, 'color': 'blue',
         'body_type': 'wagon', 'engine': '1.6 MT', 'price': 9500,
         'fuel': 'petrol', 'transmission': 'manual'},
        {'brand': 'Mercedes-Benz', 'model': 'E200', 'year': 2021, 'color': 'black',
         'body_type': 'sedan', 'engine': '2.0 AT', 'price': 42000,
         'fuel': 'petrol', 'transmission': 'automatic', 'on_main_page': True},
        {'brand': 'Hyundai', 'model': 'Tucson', 'year': 2019, 'color': 'red',
         'body_type': 'crossover', 'engine': '2.0 AT', 'price': 19500,
         'fuel': 'petrol', 'transmission': 'automatic'},
    ]
    for data in cars:
        Car.objects.create(**data)
    print(f'Создано {len(cars)} тестовых автомобилей')
else:
    print('Автомобили уже есть в базе, пропускаем')