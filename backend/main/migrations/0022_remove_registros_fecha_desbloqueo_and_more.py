# Generated by Django 4.1.5 on 2023-06-19 21:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0021_remove_registros_coste_final_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='registros',
            name='fecha_desbloqueo',
        ),
        migrations.AddField(
            model_name='registros',
            name='estado_pago',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='registros',
            name='fecha_alquiler',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='registros',
            name='id_pago',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='registros',
            name='precio_total',
            field=models.DecimalField(decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='registros',
            name='usuario',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='registros', to=settings.AUTH_USER_MODEL),
        ),
    ]
