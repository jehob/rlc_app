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
from . import UserProfile


class Rlc(models.Model):
    creator = models.ForeignKey(UserProfile, related_name='rlc_created', on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=False)
    rlc_members = models.ManyToManyField(UserProfile, related_name="rlc_members")
    uni_tied = models.BooleanField(default=False)
    part_of_umbrella = models.BooleanField(default=True)
    note = models.CharField(max_length=4000, null=True, default="")
    # TODO: abbreviation for rlc??

    def __str__(self):
        return 'rlc: ' + str(self.id) + ':' + self.name

    def get_consultants(self):
        return UserProfile.objects.get_users_with_special_permission('can_consult', for_rlc=self.id)