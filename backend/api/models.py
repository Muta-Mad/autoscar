from django.db import models

class Car(models.Model):
    brand = models.CharField(verbose_name='Марка')
    model = models.CharField(verbose_name='Модель')
    year = models.IntegerField(verbose_name='Год выпуска')
    color = models.CharField(verbose_name='Цвет')
    body_type = models.CharField(verbose_name='Тип кузова')
    engine = models.CharField(verbose_name='Двигатель')
    price = models.IntegerField(verbose_name='Цена')
    is_sold = models.BooleanField(verbose_name='Продано', default=False)
    fuel = models.CharField(verbose_name='Тип топливо')
    transmission = models.CharField(verbose_name='Трансмиссия')
    created_at = models.DateField(verbose_name='Опубликовано', auto_now_add=True)