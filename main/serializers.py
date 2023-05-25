from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from main.models import Patinete, Estacion, PuestoCarga, Registros, Profile
from django.contrib.auth import get_user_model, authenticate

class PatineteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patinete
        fields = ['url','identificador','vatios','estado', 'precio_desbloqueo','precio_minuto']

class EstacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estacion
        fields = ['url','nombre','direccion','estado']


class PuestoCargaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PuestoCarga
        fields = ['url','numeroPuesto','disponible','nombre']


class RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registros
        fields = ['url','usuario','nombre','numeroPuesto', 'identificador','fecha_desbloqueo', 'fecha_entrega', 'coste_final']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['url','usuario','dni','telefono']


