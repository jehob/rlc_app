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

from django.core.management.base import BaseCommand

from backend.api import models
from backend.api.management.commands._fixtures import AddMethods
from backend.recordmanagement import models


class Command(BaseCommand):
    help = 'populates database for deployment environment'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        rlc = models.Rlc(name='Dummy RLC', note='this is a dummy rlc, just for showing how the system works')
        rlc.save()
        users = self.get_and_create_users(rlc)
        main_user = self.get_and_create_dummy_user(rlc)

    def get_and_create_dummy_user(self, rlc):
        user = models.UserProfile(name='Mr Dummy', email='dummy@rlcm.de', phone_number='01666666666',
                                  street='Dummyweg 12', city='Dummycity', postal_code='00000', rlc=rlc)
        user.birthday = AddMethods.generate_date((1995, 1, 1))
        user.set_password('qwe123')
        user.save()
        return user

    def get_and_create_users(self, rlc):
        users = [
            (
                'ludwig.maximilian@outlook.de',
                'Ludwig Maximilian',
                (1985, 5, 12),
                '01732421123',
                'Maximilianstrasse 12',
                'München',
                '80539'
            ),
            (
                'xxALIxxstone@hotmail.com',
                'Albert Einstein',
                (1879, 3, 14),
                '01763425656',
                'Blumengasse 23',
                'Hamburg',
                '83452'
            ),
            (
                'mariecurry53@hotmail.com',
                'Marie Curie',
                (1867, 11, 7),
                '0174565656',
                'Jungfernstieg 2',
                'Hamburg',
                '34264'
            ),
            (
                'max.mustermann@gmail.com',
                'Maximilian Gustav Mustermann',
                (1997, 10, 23),
                '0176349756',
                'Schlossallee 100',
                'Grünwald',
                '82031'
            ),
            (
                'petergustav@gmail.com',
                'Peter Klaus Gustav von Guttenberg',
                (1995, 3, 11),
                '01763423732',
                'Leopoldstrasse 31',
                'Muenchen',
                '80238'
            ),
            (
                'gabi92@hotmail.com',
                'Gabriele Schwarz',
                (1998, 12, 10),
                '0175647332',
                'Kartoffelweg 12',
                'Muenchen',
                '80238'
            ),
            (
                'rudi343@gmail.com',
                'Rudolf Mayer',
                (1996, 5, 23),
                '01534423732',
                'Barerstrasse 3',
                'Muenchen',
                '80238'
            ),
            (
                'lea.g@gmx.com',
                'Lea Glas',
                (1985, 7, 11),
                '01763222732',
                'Argentinische Allee 34',
                'Hamburg',
                '34264'
            ),
            (
                'butterkeks@gmail.com',
                'Bettina Rupprecht',
                (1995, 10, 11),
                '01765673732',
                'Ordensmeisterstrasse 56',
                'Hamburg',
                '34264'
            ),
            (
                'willi.B@web.de',
                'Willi Birne',
                (1997, 6, 15),
                '01763425555',
                'Grunewaldstrasse 45',
                'Hamburg',
                '34264'
            ),
            (
                'pippi.langstrumpf@gmail.com',
                'Pippi Langstumpf',
                (1981, 7, 22),
                '01766767732',
                'Muehlenstraße 12',
                'Muenchen',
                '80238'
            )
        ]

        new_users = []
        for user in users:
            new_user = models.UserProfile(email=user[0], name=user[1], phone_number=user[4], street=user[5],
                                          city=user[6], postal_code=user[7], rlc=rlc)
            new_user.birthday = AddMethods.generate_date(user[3])
            new_user.save()
            new_users.append(new_user)
        return new_users

    def get_and_create_groups(self, rlc):
        pass
