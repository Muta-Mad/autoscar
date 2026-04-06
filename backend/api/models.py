from django.db import models

class Choise:
    pass


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
    on_main_page = models.BooleanField(verbose_name='На главную', default=False)


class Category(models.Model):
    name = models.CharField(verbose_name='Название')
    is_active = models.BooleanField(verbose_name='Активна', default=True)
    

    def __str__(self) -> str:
        return self.name


class Service(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(verbose_name='Название')
    price = models.IntegerField(verbose_name='Цена')

    def __str__(self) -> str:
        return self.name