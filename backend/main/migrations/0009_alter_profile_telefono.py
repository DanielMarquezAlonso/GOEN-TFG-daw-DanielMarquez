# Generated by Django 4.1.5 on 2023-06-12 07:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_alter_profile_telefono'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='telefono',
            field=models.CharField(default='', max_length=20),
        ),
    ]
