# Generated by Django 4.1.5 on 2023-06-12 08:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0014_remove_patinete_precio_minuto_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='patinete',
        ),
        migrations.AddField(
            model_name='profile',
            name='patinetes',
            field=models.ManyToManyField(to='main.patinete'),
        ),
    ]
