# Generated by Django 4.1.5 on 2023-05-22 10:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='patinete',
            name='usuario',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='usuario',
        ),
        migrations.RemoveField(
            model_name='registros',
            name='usuario',
        ),
    ]
