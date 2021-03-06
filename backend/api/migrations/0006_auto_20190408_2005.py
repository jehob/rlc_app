# Generated by Django 2.1.2 on 2019-04-08 18:05

import backend.api.models.user_activation_link
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_newuserrequest'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserActivationLink',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('link', models.CharField(auto_created=True, default=backend.api.models.user_activation_link.generate_link_id, max_length=32, unique=True)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterField(
            model_name='forgotpasswordlinks',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='forgot_password_link', to=settings.AUTH_USER_MODEL),
        ),
    ]
