from django.contrib import admin

from api.models import Brand, Car, Service, Category

admin.site.register(Car)
admin.site.register(Service)
admin.site.register(Category)
admin.site.register(Brand)
