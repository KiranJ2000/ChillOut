# Generated by Django 3.1.5 on 2021-06-10 10:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210610_1549'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useri',
            name='session_key',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
