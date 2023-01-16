from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    #ruta para establecer idioma
    path('i18n/', include('django.conf.urls.i18n')),
    path('', TemplateView.as_view(template_name='main/index.html'), name='welcome'),
]
