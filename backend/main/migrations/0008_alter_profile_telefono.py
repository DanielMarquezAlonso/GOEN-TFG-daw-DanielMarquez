# Generated by Django 4.1.5 on 2023-06-12 07:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_profile_usuario'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='telefono',
            field=models.CharField(default=None, max_length=20),
        ),
    ]