# Generated by Django 2.1.2 on 2018-10-14 17:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20180916_1316'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userprofile',
            old_name='zip_code',
            new_name='postal_code',
        ),
    ]
