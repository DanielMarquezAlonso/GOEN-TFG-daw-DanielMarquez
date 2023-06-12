from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from main.models import Patinete, Estacion, PuestoCarga, Registros, Profile
from django.contrib.auth import get_user_model, authenticate

class PatineteSerializer(serializers.ModelSerializer):
    propietario = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Patinete
        fields = ['url', 'identificador', 'vatios', 'precio_desbloqueo', 'precio_minuto', 'propietario']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['propietario'] = user
        return super().create(validated_data)
class EstacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estacion
        fields = ['url','nombre','direccion','estado']


class PuestoCargaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PuestoCarga
        fields = ['url','numeroPuesto', 'puesto', 'disponible','estacion']


class RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registros
        fields = ['url','usuario','nombre','numeroPuesto', 'identificador','fecha_desbloqueo', 'fecha_entrega', 'coste_final']

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='usuario.username')
    email = serializers.CharField(source='usuario.email')

    class Meta:
        model = Profile
        fields = ['url','username','email','dni','telefono', 'patinete_seleccionado']


