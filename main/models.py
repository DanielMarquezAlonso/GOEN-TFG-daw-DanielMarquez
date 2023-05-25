from django.db import models
from django.db.models import Max

from django.contrib.auth.models import User


# Create your models here.

class Patinete(models.Model):
    identificador = models.IntegerField(primary_key=True, unique=True)
    vatios = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.BooleanField()
    # usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    precio_minuto = models.DecimalField(max_digits=10, decimal_places=2)
    precio_desbloqueo = models.DecimalField(max_digits=10, decimal_places=2)


    # def __str__(self):
    #     return '{} - {} - {} - {} - {} - {}'.format(self.identificador, self.vatios, self.estado, self.precio_minuto, self.precio_minuto, self.precio_desbloqueo)

class Profile(models.Model):
    # usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    dni = models.CharField(max_length=9)
    telefono = models.IntegerField(null=True)

    # def __str__(self):
    #     return '{} - {} - {}'.format(self.usuario, self.dni, self.telefono)


class Estacion(models.Model):
    nombre = models.CharField(primary_key=True, max_length=100)
    direccion = models.CharField(max_length=100)
    estado = models.BooleanField()

    def __str__(self):
        return '{} - {} - {}'.format(self.nombre, self.direccion, self.estado)


class PuestoCarga(models.Model):
    numeroPuesto = models.IntegerField(primary_key=True)
    disponible = models.BooleanField()
    estacion = models.ForeignKey(Estacion, on_delete=models.CASCADE)

    def __str__(self):
        return '{} - {} - {}'.format(self.numeroPuesto, self.disponible, self.estacion)


# class PuestoCarga(models.Model):
#     numeroPuesto = models.DecimalField(primary_key=True, max_digits=10, decimal_places=2)
#     disponible = models.BooleanField()
#     estacion = models.ForeignKey(Estacion, on_delete=models.CASCADE, related_name='puestos_carga')
#
#     def __str__(self):
#         return '{} - {} - {}'.format(self.numeroPuesto, self.disponible, self.estacion)

# class PuestoCarga(models.Model):
#     numeroPuesto = models.DecimalField(primary_key=True, max_digits=10, decimal_places=2)
#     disponible = models.BooleanField()
#     nombre = models.ForeignKey(Estacion, on_delete=models.CASCADE)
#
#     def __str__(self):
#         return '{} - {} - {}'.format(self.numeroPuesto, self.disponible, self.nombre)

class Registros(models.Model):
    # usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    nombre = models.ForeignKey(Estacion, on_delete=models.CASCADE)
    numeroPuesto = models.ForeignKey(PuestoCarga, on_delete=models.CASCADE)
    identificador = models.ForeignKey(Patinete, on_delete=models.CASCADE)
    fecha_desbloqueo = models.DateTimeField()
    fecha_entrega = models.DateTimeField(null=True)
    coste_final = models.FloatField(null=True)

    # def __str__(self):
    #     return '{} - {} - {} - {} - {} - {} - {}'.format(self.usuario, self.nombre, self.numeroPuesto, self.identificador, self.fecha_desbloqueo, self.fecha_entrega, self.coste_final)