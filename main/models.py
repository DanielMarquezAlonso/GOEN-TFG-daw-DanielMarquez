from _decimal import Decimal

from django.db import models
from django.db.models import Max

from django.contrib.auth.models import User
from django.forms import ModelForm


# Create your models here.



class Patinete(models.Model):
    identificador = models.AutoField(primary_key=True, unique=True)
    vatios = models.DecimalField(max_digits=10, decimal_places=2)
    # precio_minuto = models.DecimalField(max_digits=10, decimal_places=2)
    precio_desbloqueo = models.DecimalField(max_digits=10, decimal_places=2, default=1, editable=False)
    propietario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='patinetes_propios', null=True, blank=True)

    @property
    def precio_minuto(self):
        # Calcula el precio por minuto en función de los vatios
        precio = Decimal(self.vatios) * Decimal('0.033')  # Adjust the formula according to your needs
        return precio.quantize(Decimal('0.00'))

    def __str__(self):
        return '{} - {} - {} - {}'.format(
            self.identificador, self.propietario, self.vatios, self.precio_minuto
        )

class Profile(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, null=True, default=None)
    dni = models.CharField(max_length=9, null=True, blank=True)
    telefono = models.CharField(max_length=20, default='', blank=True)
    patinete_seleccionado = models.OneToOneField(Patinete, on_delete=models.SET_NULL, null=True, blank=True, related_name='usuario_propietario')


    def __str__(self):
        return '{} - {} - {}'.format(self.usuario, self.dni, self.telefono)


class Estacion(models.Model):
    nombre = models.CharField(primary_key=True, max_length=100)
    direccion = models.CharField(max_length=100)
    estado = models.BooleanField()

    def __str__(self):
        return '{} - {} - {}'.format(self.nombre, self.direccion, self.estado)


class PuestoCarga(models.Model):
    numeroPuesto = models.IntegerField(primary_key=True, blank=True)
    puesto = models.IntegerField(default=1)
    disponible = models.BooleanField()
    estacion = models.ForeignKey(Estacion, on_delete=models.CASCADE, blank=True)


    def __str__(self):
        return '{} - {} - {} - {}'.format(self.numeroPuesto, self.disponible, self.estacion, self.puesto)


class Registros(models.Model):
    id_pago = models.CharField(max_length=100, null=True)
    fecha_alquiler = models.CharField(max_length=100, null=True)
    precio_total = models.CharField(max_length=100, null=True)
    estado_pago = models.CharField(max_length=100, null=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='registros', null=True, blank=True)


    # def __str__(self):
    #     return '{} - {} - {} - {} - {} - {} - {}'.format(self.usuario, self.nombre, self.numeroPuesto, self.identificador, self.fecha_desbloqueo, self.fecha_entrega, self.coste_final)
# class Registros(models.Model):
#     # usuario = models.ForeignKey(User, on_delete=models.CASCADE)
#     nombre = models.ForeignKey(Estacion, on_delete=models.CASCADE)
#     numeroPuesto = models.ForeignKey(PuestoCarga, on_delete=models.CASCADE)
#     identificador = models.ForeignKey(Patinete, on_delete=models.CASCADE)
#     fecha_desbloqueo = models.DateTimeField()
#     fecha_entrega = models.DateTimeField(null=True)
#     coste_final = models.FloatField(null=True)

#     # def __str__(self):
#     #     return '{} - {} - {} - {} - {} - {} - {}'.format(self.usuario, self.nombre, self.numeroPuesto, self.identificador, self.fecha_desbloqueo, self.fecha_entrega, self.coste_final)