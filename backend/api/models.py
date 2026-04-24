from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from api.constants import (
    CAR_YEAR_MIN,
    CAR_NAME_MAX_LENGTH,
    CAR_CHOICE_MAX_LENGTH,
    CAR_YEAR_MAX
)


class BodyType(models.TextChoices):
    SEDAN = 'sedan', 'Седан'
    SUV = 'suv', 'Внедорожник'
    HATCHBACK = 'hatchback', 'Хэтчбек'
    WAGON = 'wagon', 'Универсал'
    COUPE = 'coupe', 'Купе'
    CONVERTIBLE = 'convertible', 'Кабриолет'
    MINIVAN = 'minivan', 'Минивэн'
    PICKUP = 'pickup', 'Пикап'
    CROSSOVER = 'crossover', 'Кроссовер'


class FuelType(models.TextChoices):
    PETROL = 'petrol', 'Бензин'
    DIESEL = 'diesel', 'Дизель'
    HYBRID = 'hybrid', 'Гибрид'
    ELECTRIC = 'electric', 'Электро'
    GAS = 'gas', 'Газ (LPG)'


class Transmission(models.TextChoices):
    MANUAL = 'manual', 'Механика'
    AUTOMATIC = 'automatic', 'Автомат'
    CVT = 'cvt', 'Вариатор'
    ROBOT = 'robot', 'Робот'


class Color(models.TextChoices):
    WHITE = 'white', 'Белый'
    BLACK = 'black', 'Чёрный'
    SILVER = 'silver', 'Серебристый'
    GRAY = 'gray', 'Серый'
    RED = 'red', 'Красный'
    BLUE = 'blue', 'Синий'
    GREEN = 'green', 'Зелёный'
    BROWN = 'brown', 'Коричневый'
    BEIGE = 'beige', 'Бежевый'
    YELLOW = 'yellow', 'Жёлтый'
    ORANGE = 'orange', 'Оранжевый'
    OTHER = 'other', 'Другой'


class EcoSticker(models.TextChoices):
    ZERO = 'zero', '0 (Cero emisiones)'
    ECO = 'eco', 'ECO'
    C = 'c', 'C'
    B = 'b', 'B'


class Car(models.Model):
    brand = models.ForeignKey(
        'Brand', 
        on_delete=models.CASCADE, 
        verbose_name='Марка'
    )
    
    model = models.CharField(
        verbose_name='Модель',
        max_length=CAR_NAME_MAX_LENGTH
    )
    
    year = models.IntegerField(
        verbose_name='Год выпуска',
        validators=[
            MinValueValidator(
                CAR_YEAR_MIN, message=f'год не может быть меньше чем:{CAR_YEAR_MIN}'
            ), 
            MaxValueValidator(
                CAR_YEAR_MAX, message=f'год не может быть больше чем:{CAR_YEAR_MAX}'
            )
        ]
    )

    color = models.CharField(
        verbose_name='Цвет',
        max_length=CAR_CHOICE_MAX_LENGTH,
        choices=Color.choices,
        default=Color.OTHER,
    )

    body_type = models.CharField(
        verbose_name='Тип кузова',
        max_length=CAR_CHOICE_MAX_LENGTH,
        choices=BodyType.choices,
    )

    engine_capacity = models.PositiveIntegerField(
        verbose_name='Объем двигателя'
    )

    price = models.PositiveIntegerField(
        verbose_name='Цена (Euro)'
    )
    
    is_sold = models.BooleanField(
        verbose_name='Продано', 
        default=False
    )

    fuel = models.CharField(
        verbose_name='Тип топлива',
        max_length=CAR_CHOICE_MAX_LENGTH,
        choices=FuelType.choices,
    )

    transmission = models.CharField(
        verbose_name='Трансмиссия',
        max_length=CAR_CHOICE_MAX_LENGTH,
        choices=Transmission.choices,
    )

    created_at = models.DateField(
        verbose_name='Опубликовано', 
        auto_now_add=True
    )
    
    on_main_page = models.BooleanField(
        verbose_name='На главную', 
        default=False
    )
    
    eco_sticker = models.CharField(
        verbose_name='Эконаклейка',
        max_length=CAR_CHOICE_MAX_LENGTH,
        choices=EcoSticker.choices,
        blank=True,
        null=True,
    )

    available = models.BooleanField(
        verbose_name='В наличии', default=True
    )

    description = models.TextField(
        verbose_name='Описание'
    )

    mileage = models.PositiveBigIntegerField(
        verbose_name='Пробег'
    )

    image = models.ImageField(
        verbose_name='Главное фото',
        upload_to='cars/main/',
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = 'Автомобиль'
        verbose_name_plural = 'Автомобили'
        ordering = ('price',)

    def __str__(self) -> str:
        return f'{self.brand} {self.model} ({self.year})'
    
class CarImage(models.Model):
    car = models.ForeignKey(
        Car,
        on_delete=models.CASCADE,
        related_name='images',
        verbose_name='Автомобиль'
    )
    image = models.ImageField(
        verbose_name='Фото',
        upload_to='cars/gallery/',
    )

    class Meta:
        verbose_name = 'Фото'
        verbose_name_plural = 'Фотографии'

    def __str__(self) -> str:
        return f'Фото {self.car}'


class Brand(models.Model):
    name = models.CharField(
        verbose_name='Название',
        max_length=CAR_NAME_MAX_LENGTH
    )

    class Meta:
        verbose_name = 'Марка'
        verbose_name_plural = 'Марки'

    def __str__(self) -> str:
        return self.name

    
class Category(models.Model):
    name = models.CharField(
        verbose_name='Название',
        max_length=CAR_NAME_MAX_LENGTH
    )

    is_active = models.BooleanField(
        verbose_name='Активна', default=True
    )

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self) -> str:
        return self.name


class Service(models.Model):
    category = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE, 
        verbose_name='Категория'
    )
    
    name = models.CharField(
        verbose_name='Название',
    )

    price = models.PositiveIntegerField(
        verbose_name='Цена',
    )

    class Meta:
        verbose_name = 'Услуга'
        verbose_name_plural = 'Услуги'

    def __str__(self) -> str:
        return self.name
