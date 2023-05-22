from django.shortcuts import render
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import action
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
# from .permissions import IsOwner
# Create your views here.

class PatineteViewSet(viewsets.ModelViewSet):
    queryset = Patinete.objects.all()
    serializer_class = PatineteSerializer
    # permission_classes = [permissions.IsAuthenticated]

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

class RegistroViewSet(viewsets.ModelViewSet):
    queryset = Registros.objects.all()
    serializer_class = RegistroSerializer
    # permission_classes = [permissions.IsAuthenticated]

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return Response({'message': 'Inicio de sesión exitoso'})
    else:
        return Response({'message': 'Credenciales inválidas'}, status=400)

@api_view(['POST'])
def register_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        # Crea un nuevo usuario
        user = User.objects.create_user(username=username, password=password)
        return Response({'message': 'Registro exitoso'})
    except Exception as e:
        return Response({'message': str(e)}, status=400)