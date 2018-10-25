""" rlcapp - record and organization management software for refugee law clinics
Copyright (C) 2018  Dominik Walser

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/> """
from django.db import models
from backend.api.models import UserProfile, Rlc
from backend.recordmanagement.models import RecordTag


class Record(models.Model):
    creator = models.ForeignKey(
        UserProfile, related_name="records_created", on_delete=models.SET_NULL, null=True)
    from_rlc = models.ForeignKey(Rlc, related_name='record_from_rlc', on_delete=models.SET_NULL, null=True,
                                 default=None)

    created_on = models.DateField(auto_now_add=True)
    last_edited = models.DateTimeField(auto_now_add=True)

    client = models.ForeignKey(
        'Client', related_name="records", on_delete=models.SET_NULL, null=True)
    first_contact_date = models.DateField(default=None, null=True)
    last_contact_date = models.DateTimeField(default=None, null=True)

    record_token = models.CharField(
        max_length=50, unique=True)
    note = models.CharField(max_length=4096)

    working_on_record = models.ManyToManyField(
        UserProfile, related_name="working_on_record", blank=True)
    tagged = models.ManyToManyField(RecordTag, related_name="tagged", blank=True)

    record_states_possible = (
        ('op', 'open'),
        ('cl', 'closed'),
        ('wa', 'waiting')
    )

    state = models.CharField(max_length=2, choices=record_states_possible)

    def __str__(self):
        return 'record: ' + str(self.id) + ':' + self.record_token
