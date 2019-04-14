# Generated by Django 2.1.2 on 2019-02-06 12:02

import backend.api.models.forgot_password
from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ForgotPasswordLinks',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('link', models.CharField(auto_created=True, default=backend.api.models.forgot_password.generate_link_id, max_length=32, unique=True)),
                ('date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='phone_number',
            field=models.CharField(default=None, max_length=17, null=True, validators=[django.core.validators.RegexValidator(message='Phone number must be entered in the format: Up to 15 digits allowed.', regex='^\\+{0,2}\\d{6,15}$')]),
        ),
        migrations.AddField(
            model_name='forgotpasswordlinks',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='activation_link', to=settings.AUTH_USER_MODEL),
        ),
    ]