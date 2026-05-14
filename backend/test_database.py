import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'autoscar.settings')
django.setup()

from django.contrib.auth.models import User
from api.models import Brand, Car, Category, Service
from api.models import BodyType, FuelType, Transmission, Color, EcoSticker

# --- Суперюзеры ---

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

# --- Бренды ---

brands_names = [
    'Toyota',
    'BMW',
    'Mercedes-Benz',
    'Volkswagen',
    'Hyundai',
    'Ford',
    'Audi',
    'Kia',
    'Nissan',
    'Renault',
]

brands = {}
for name in brands_names:
    brand, created = Brand.objects.get_or_create(name=name)
    brands[name] = brand
    if created:
        print(f'Бренд создан: {name}')

# --- Машины ---

if Car.objects.count() == 0:
    cars = [
        {
            'brand': brands['Toyota'],
            'model': 'Camry',
            'year': 2022,
            'color': Color.WHITE,
            'body_type': BodyType.SEDAN,
            'engine_capacity': 2500,
            'price': 22000,
            'is_sold': False,
            'fuel': FuelType.PETROL,
            'transmission': Transmission.AUTOMATIC,
            'on_main_page': True,
            'eco_sticker': EcoSticker.C,
            'available': True,
            'mileage': 35000,
            'description': 'Отличное состояние, один владелец, полный сервисный пакет.',
        },
        {
            'brand': brands['BMW'],
            'model': 'X5',
            'year': 2021,
            'color': Color.BLACK,
            'body_type': BodyType.SUV,
            'engine_capacity': 3000,
            'price': 55000,
            'is_sold': False,
            'fuel': FuelType.DIESEL,
            'transmission': Transmission.AUTOMATIC,
            'on_main_page': True,
            'eco_sticker': EcoSticker.B,
            'available': True,
            'mileage': 48000,
            'description': 'Комплектация M-Sport, панорамная крыша, адаптивная подвеска.',
        },
        {
            'brand': brands['Volkswagen'],
            'model': 'Golf',
            'year': 2020,
            'color': Color.SILVER,
            'body_type': BodyType.HATCHBACK,
            'engine_capacity': 1400,
            'price': 18500,
            'is_sold': True,
            'fuel': FuelType.PETROL,
            'transmission': Transmission.ROBOT,
            'on_main_page': False,
            'eco_sticker': EcoSticker.C,
            'available': False,
            'mileage': 72000,
            'description': 'Продан. Хорошее состояние, новая резина.',
        },
        {
            'brand': brands['Toyota'],
            'model': 'RAV4 Hybrid',
            'year': 2023,
            'color': Color.GRAY,
            'body_type': BodyType.CROSSOVER,
            'engine_capacity': 2500,
            'price': 38000,
            'is_sold': False,
            'fuel': FuelType.HYBRID,
            'transmission': Transmission.CVT,
            'on_main_page': True,
            'eco_sticker': EcoSticker.ECO,
            'available': True,
            'mileage': 12000,
            'description': 'Гибридная система, полный привод AWD, минимальный расход топлива.',
        },
        {
            'brand': brands['Nissan'],
            'model': 'Leaf',
            'year': 2023,
            'color': Color.BLUE,
            'body_type': BodyType.HATCHBACK,
            'engine_capacity': 0,
            'price': 29000,
            'is_sold': False,
            'fuel': FuelType.ELECTRIC,
            'transmission': Transmission.AUTOMATIC,
            'on_main_page': True,
            'eco_sticker': EcoSticker.ZERO,
            'available': True,
            'mileage': 8000,
            'description': 'Электромобиль, запас хода 385 км, быстрая зарядка CHAdeMO.',
        },
        {
            'brand': brands['Mercedes-Benz'],
            'model': 'C-Class',
            'year': 2019,
            'color': Color.RED,
            'body_type': BodyType.SEDAN,
            'engine_capacity': 1500,
            'price': 31000,
            'is_sold': True,
            'fuel': FuelType.PETROL,
            'transmission': Transmission.AUTOMATIC,
            'on_main_page': False,
            'eco_sticker': EcoSticker.B,
            'available': False,
            'mileage': 95000,
            'description': 'Продан. Кожаный салон, навигация, подогрев сидений.',
        },
        {
            'brand': brands['Ford'],
            'model': 'Ranger',
            'year': 2022,
            'color': Color.ORANGE,
            'body_type': BodyType.PICKUP,
            'engine_capacity': 2000,
            'price': 42000,
            'is_sold': False,
            'fuel': FuelType.DIESEL,
            'transmission': Transmission.MANUAL,
            'on_main_page': False,
            'eco_sticker': None,
            'available': True,
            'mileage': 27000,
            'description': 'Двойная кабина, фаркоп, защита поддона. Идеален для бездорожья.',
        },
        {
            'brand': brands['Hyundai'],
            'model': 'Tucson',
            'year': 2021,
            'color': Color.BEIGE,
            'body_type': BodyType.CROSSOVER,
            'engine_capacity': 1600,
            'price': 26500,
            'is_sold': False,
            'fuel': FuelType.GAS,
            'transmission': Transmission.AUTOMATIC,
            'on_main_page': False,
            'eco_sticker': EcoSticker.C,
            'available': True,
            'mileage': 61000,
            'description': 'Установлено ГБО 4 поколения, экономичный расход газа.',
        },
        {
            'brand': brands['Audi'],
            'model': 'A6 Avant',
            'year': 2020,
            'color': Color.GREEN,
            'body_type': BodyType.WAGON,
            'engine_capacity': 2000,
            'price': 48000,
            'is_sold': False,
            'fuel': FuelType.DIESEL,
            'transmission': Transmission.ROBOT,
            'on_main_page': True,
            'eco_sticker': EcoSticker.B,
            'available': True,
            'mileage': 53000,
            'description': 'Универсал бизнес-класса, Virtual Cockpit, матричные фары.',
        },
        {
            'brand': brands['Renault'],
            'model': 'Megane RS',
            'year': 2018,
            'color': Color.YELLOW,
            'body_type': BodyType.COUPE,
            'engine_capacity': 1800,
            'price': 21000,
            'is_sold': False,
            'fuel': FuelType.PETROL,
            'transmission': Transmission.MANUAL,
            'on_main_page': False,
            'eco_sticker': None,
            'available': True,
            'mileage': 88000,
            'description': 'Спортивная версия RS, бремборские тормоза, спортивные сиденья Recaro.',
        },
    ]
    for data in cars:
        Car.objects.create(**data)
    print(f'Создано {len(cars)} тестовых автомобилей')
else:
    print('Автомобили уже есть в базе, пропускаем')

# --- Категории и услуги ---

categories_data = {
    'Техническое обслуживание': [
        {'name': 'Замена масла', 'price': 80},
        {'name': 'Замена тормозных колодок', 'price': 150},
    ],
    'Кузовной ремонт': [
        {'name': 'Покраска бампера', 'price': 350},
    ],
    'Диагностика': [
        {'name': 'Компьютерная диагностика', 'price': 60},
    ],
}

for cat_name, services in categories_data.items():
    category, _ = Category.objects.get_or_create(name=cat_name)
    for svc in services:
        _, created = Service.objects.get_or_create(
            category=category,
            name=svc['name'],
            defaults={'price': svc['price']},
        )
        if created:
            print(f'Услуга создана: {svc["name"]}')
