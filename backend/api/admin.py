from django.contrib import admin

from api.models import Brand, Car, CarImage, Category, Service


class CarImageInline(admin.TabularInline):
    model = CarImage
    extra = 3


class ServiceInline(admin.TabularInline):
    model = Service
    extra = 1
    fields = ('name', 'name_en', 'name_es', 'price')


@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    inlines = [CarImageInline]
    fieldsets = (
        (
            None,
            {
                'fields': (
                    'brand',
                    'model',
                    'year',
                    'color',
                    'body_type',
                    'engine_capacity',
                    'fuel',
                    'transmission',
                    'mileage',
                    'price',
                    'eco_sticker',
                    'available',
                    'is_sold',
                    'on_main_page',
                    'image',
                ),
            },
        ),
        (
            'Описание',
            {
                'fields': ('description', 'description_en', 'description_es'),
            },
        ),
    )


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    inlines = [ServiceInline]
    fields = ('name', 'name_en', 'name_es', 'is_active')


admin.site.register(Brand)
