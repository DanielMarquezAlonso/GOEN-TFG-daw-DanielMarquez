# Generated by Django 4.1.5 on 2023-06-12 08:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0016_alter_profile_patinetes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='dni',
            field=models.CharField(blank=True, max_length=9, null=True),
        ),
    ]
