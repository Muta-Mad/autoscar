from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator
from api.constants import (
    CAR_YEAR_MIN,
    CAR_NAME_MAX_LENGTH,
    CAR_CHOICE_MAX_LENGTH,
    CAR_PRICE_MIN,
    SERVICE_PRICE_MIN,
    SERVICE_NAME_MAX_LENGTH,
)
import datetime


def validate_year(value):
    current = datetime.date.today().year
    if value < CAR_YEAR_MIN:
        raise ValidationError(f'Год не может быть раньше {CAR_YEAR_MIN}')
    if value > current + 1:
        raise ValidationError(f'Год не может быть больше {current + 1}')


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
    brand = models.CharField(verbose_name='Марка',
                             max_length=CAR_NAME_MAX_LENGTH)
    model = models.CharField(verbose_name='Модель',
                             max_length=CAR_NAME_MAX_LENGTH)
    year = models.IntegerField(
        verbose_name='Год выпуска',
        validators=[validate_year],
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
    engine = models.CharField(verbose_name='Двигатель',
                              max_length=CAR_NAME_MAX_LENGTH)
    price = models.IntegerField(
        verbose_name='Цена (Euro)',
        validators=[MinValueValidator(
            CAR_PRICE_MIN, message='Цена должна быть положительной')],
    )
    is_sold = models.BooleanField(verbose_name='Продано', default=False)
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
        verbose_name='Опубликовано', auto_now_add=True)
    on_main_page = models.BooleanField(
        verbose_name='На главную', default=False)
    eco_sticker = models.CharField(
        verbose_name='Эконаклейка',
        max_length=CAR_CHOICE_MAX_LENGTH,
        choices=EcoSticker.choices,
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = 'Автомобиль'
        verbose_name_plural = 'Автомобили'

    def __str__(self) -> str:
        return f'{self.brand} {self.model} ({self.year})'


class Category(models.Model):
    name = models.CharField(verbose_name='Название',
                            max_length=CAR_NAME_MAX_LENGTH)
    is_active = models.BooleanField(verbose_name='Активна', default=True)

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self) -> str:
        return self.name


class Service(models.Model):
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, verbose_name='Категория')
    name = models.CharField(verbose_name='Название',
                            max_length=SERVICE_NAME_MAX_LENGTH)
    price = models.IntegerField(
        verbose_name='Цена',
        validators=[MinValueValidator(
            SERVICE_PRICE_MIN, message='Цена должна быть положительной')],
    )

    class Meta:
        verbose_name = 'Услуга'
        verbose_name_plural = 'Услуги'

    def __str__(self) -> str:
        return self.name
