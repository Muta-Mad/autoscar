from django.contrib import admin

from api.models import Brand, Car, CarImage, Service, Category


class CarImageInline(admin.TabularInline):
    model = CarImage
    extra = 3


@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    inlines = [CarImageInline]


admin.site.register(Service)
admin.site.register(Category)
admin.site.register(Brand)
