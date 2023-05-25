from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from main.views import PatineteViewSet, RegistroViewSet,PuestoCargaViewSet,EstacionViewSet,ProfileViewSet, login_view, register_view
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'patinetes', PatineteViewSet)
router.register(r'profile', ProfileViewSet)
router.register(r'estacion', EstacionViewSet)
router.register(r'puestoCarga', PuestoCargaViewSet)
router.register(r'registro', RegistroViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    #ruta para establecer idioma
    # path('i18n/', include('django.conf.urls.i18n')),
    # path('', TemplateView.as_view(template_name='main/index.html'), name='welcome'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/login/', login_view, name='login'),
    path('api/register/', register_view, name='register'),
    # path('api/', include('user_api.urls')),

]
