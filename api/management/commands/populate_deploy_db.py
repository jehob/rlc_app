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
from django.core.management.base import BaseCommand
from api.models import *
from ._fixtures import Fixtures


class Command(BaseCommand):
    help = 'populates database for deployment environment'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        Fixtures.create_real_tags()
        Fixtures.create_example_origin_countries()
        Fixtures.create_real_permissions()
        rlcs = Fixtures.create_real_starting_rlcs()
        groups = Fixtures.create_real_groups(rlcs)