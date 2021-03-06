#  rlcapp - record and organization management software for refugee law clinics
#  Copyright (C) 2019  Dominik Walser
# 
#  This program is free software: you can redistribute it and/or modify
#  it under the terms of the GNU Affero General Public License as
#  published by the Free Software Foundation, either version 3 of the
#  License, or (at your option) any later version.
# 
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU Affero General Public License for more details.
# 
#  You should have received a copy of the GNU Affero General Public License
#  along with this program.  If not, see <https://www.gnu.org/licenses/>

# Generated by Django 2.1.2 on 2018-12-13 14:49

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateField(auto_now_add=True)),
                ('last_edited', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(max_length=200)),
                ('note', models.TextField(max_length=4096, null=True)),
                ('phone_number', models.CharField(default=None, max_length=100, null=True, validators=[django.core.validators.RegexValidator(message='Phone number must be entered in the format: Up to 15 digits allowed.', regex='^\\+{0,2}\\d{9,15}$')])),
                ('birthday', models.DateField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='OriginCountry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
                ('state', models.CharField(choices=[('st', 'safe third country'), ('ot', 'other third country'), ('so', 'safe country')], max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='Record',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateField(auto_now_add=True)),
                ('last_edited', models.DateTimeField(auto_now_add=True)),
                ('first_contact_date', models.DateField(default=None, null=True)),
                ('last_contact_date', models.DateTimeField(default=None, null=True)),
                ('record_token', models.CharField(max_length=50, unique=True)),
                ('note', models.CharField(max_length=4096)),
                ('state', models.CharField(choices=[('op', 'open'), ('cl', 'closed'), ('wa', 'waiting')], max_length=2)),
                ('client', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='records', to='recordmanagement.Client')),
                ('creator', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='records_created', to=settings.AUTH_USER_MODEL)),
                ('from_rlc', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='record_from_rlc', to='api.Rlc')),
            ],
        ),
        migrations.CreateModel(
            name='RecordDocument',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('last_edited', models.DateTimeField(auto_now_add=True)),
                ('file_size', models.BigIntegerField()),
                ('creator', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='record_documents_created', to=settings.AUTH_USER_MODEL)),
                ('record', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='record_documents', to='recordmanagement.Record')),
            ],
        ),
        migrations.CreateModel(
            name='RecordDocumentTag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='RecordMessage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('message', models.CharField(max_length=4096)),
                ('record', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='record_messages', to='recordmanagement.Record')),
                ('sender', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='record_messages_sent', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='RecordPermission',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('requested', models.DateTimeField(auto_now_add=True)),
                ('processed_on', models.DateTimeField(null=True)),
                ('can_edit', models.BooleanField(default=False)),
                ('state', models.CharField(choices=[('re', 'requested'), ('gr', 'granted'), ('de', 'declined')], default='re', max_length=2)),
                ('record', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='permissions_requested', to='recordmanagement.Record')),
                ('request_from', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='record_permissions_requested', to=settings.AUTH_USER_MODEL)),
                ('request_processed', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='record_permissions_processed', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='RecordTag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
            ],
        ),
        migrations.AddField(
            model_name='recorddocument',
            name='tagged',
            field=models.ManyToManyField(blank=True, related_name='tagged', to='recordmanagement.RecordDocumentTag'),
        ),
        migrations.AddField(
            model_name='record',
            name='tagged',
            field=models.ManyToManyField(blank=True, related_name='tagged', to='recordmanagement.RecordTag'),
        ),
        migrations.AddField(
            model_name='record',
            name='working_on_record',
            field=models.ManyToManyField(blank=True, related_name='working_on_record', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='client',
            name='origin_country',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='clients', to='recordmanagement.OriginCountry'),
        ),
    ]
