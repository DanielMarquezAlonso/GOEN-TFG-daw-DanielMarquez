# Generated by Django 4.1.5 on 2023-06-19 23:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0022_remove_registros_fecha_desbloqueo_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registros',
            name='precio_total',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
