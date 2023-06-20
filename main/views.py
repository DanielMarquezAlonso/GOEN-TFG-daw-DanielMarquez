from django.conf import settings
from django.shortcuts import render
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views import View
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import action, permission_classes, authentication_classes
from main.models import Patinete, Estacion, PuestoCarga, Registros, Profile
from main.serializers import PatineteSerializer, RegistroSerializer, ProfileSerializer, EstacionSerializer, PuestoCargaSerializer
from rest_framework import viewsets, permissions, mixins, status, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from django.db import transaction
from django.db.models import Q, Count
from django.utils import timezone
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny



# from .permissions import IsOwner
# Create your views here.
@authentication_classes([TokenAuthentication])
class PatineteViewSet(viewsets.ModelViewSet):
    queryset = Patinete.objects.all()
    serializer_class = PatineteSerializer
    # permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.user.is_staff:
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Patinete.objects.all()
        return Patinete.objects.filter(propietario=user)

    def perform_create(self, serializer):
        serializer.save(propietario=self.request.user)

@authentication_classes([TokenAuthentication])
class RegistroViewSet(viewsets.ModelViewSet):
    queryset = Registros.objects.all()
    serializer_class = RegistroSerializer

    def get_permissions(self):
        if self.request.user.is_staff:
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Registros.objects.all()
        return Registros.objects.filter(usuario=user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
# @authentication_classes([TokenAuthentication])
# class PatineteViewSet(viewsets.ModelViewSet):
#     queryset = Patinete.objects.all()
#     serializer_class = PatineteSerializer
#     # permission_classes = [IsAuthenticated]
#
#     def get_queryset(self):
#         user = self.request.user
#         return Patinete.objects.filter(propietario=user)
#
#     def perform_create(self, serializer):
#         serializer.save(propietario=self.request.user)

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    # permission_classes = [permissions.IsAuthenticated]


class EstacionViewSet(viewsets.ModelViewSet):
    queryset = Estacion.objects.all()
    serializer_class = EstacionSerializer
    # permission_classes = [permissions.IsAuthenticated]

class PuestoCargaViewSet(viewsets.ModelViewSet):
    queryset = PuestoCarga.objects.all()
    serializer_class = PuestoCargaSerializer
    # permission_classes = [permissions.IsAuthenticated]



    # permission_classes = [permissions.IsAuthenticated]

class PuestoCargaListByEstacionViewSet(viewsets.ViewSet):
    def list(self, request, estacion_nombre=None):
        estacion = Estacion.objects.get(nombre=estacion_nombre)
        puestos_carga = PuestoCarga.objects.filter(estacion=estacion)
        serializer = PuestoCargaSerializer(puestos_carga, many=True, context={'request': request})
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'message': 'Inicio de sesión exitoso'})
    else:
        return Response({'message': 'Credenciales inválidas'}, status=400)
# sin authtoken
# @api_view(['POST'])
# def login_view(request):
#     username = request.data.get('username')
#     password = request.data.get('password')
#
#     user = authenticate(request, username=username, password=password)
#
#     if user is not None:
#         login(request, user)
#         # token, created = Token.objects.get_or_create(user=user)
#         return Response({'message': 'Inicio de sesión exitoso'})
#     else:
#         return Response({'message': 'Credenciales inválidas'}, status=400)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')
    telefono = request.data.get('telefono')
    confirm_password = request.data.get('confirm_password')

    if password != confirm_password:
        return Response({'message': 'Las contraseñas no coinciden'}, status=400)

    try:
        # Crea un nuevo usuario
        user = User.objects.create_user(username=username, password=password, email=email)

        # Crea un nuevo perfil asociado al usuario
        profile = Profile(usuario=user, telefono=telefono)
        profile.save()

        # Serializa el perfil y devuelve la respuesta
        profile_serializer = ProfileSerializer(profile, context={'request': request})
        return Response({'message': 'Registro exitoso', 'profile': profile_serializer.data})
    except Exception as e:
        return Response({'message': str(e)}, status=400)

# def get_profile(request, profile_id):
#     try:
#         profile = Profile.objects.get(id=profile_id)
#         data = {
#             'username': profile.usuario.username,
#             'email': profile.usuario.email,
#             'dni': profile.dni,
#             'telefono': profile.telefono
#         }
#         return JsonResponse(data)
#     except Profile.DoesNotExist:
#         return JsonResponse({'error': 'Profile not found'}, status=404)

