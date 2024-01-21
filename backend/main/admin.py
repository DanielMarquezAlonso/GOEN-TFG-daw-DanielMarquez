from django.contrib import admin
from .models import Patinete, Estacion, PuestoCarga, Registros, Profile

# Register your models here.

admin.site.register(Patinete)
admin.site.register(Estacion)
admin.site.register(PuestoCarga)
admin.site.register(Registros)
admin.site.register(Profile)


