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
from api.models import *
from api.tests.fixtures import *
from datetime import date, datetime
from ...statics.staticNames import StaticPermissionNames


class Fixtures:
    @staticmethod
    def create_example_static_users():
        user = UserProfile(id=1, email='abc@web.de', name='Betsy', is_active=True)
        user.set_password('qwe123')
        user.save()

        user = UserProfile(id=2, email='jehob@web.de', name='Peter', is_active=True, is_superuser=True)
        user.set_password('qwe123')
        user.save()

    @staticmethod
    def create_example_tags():
        tags = [('Dublin III',), ('family reunion',), ('asylum',), ('stay',), ('employment',)]
        for single_tag in tags:
            AddMethods.add_tag(single_tag)

    @staticmethod
    def create_example_origin_countries():
        countries = [('Botswana', 'st'), ('Ghana', 'ot'), ('Nigeria', 'so'),
                     ('Turkey', 'so'), ('Sahara', 'ot'), ('Ukraine', 'st'),
                     ('Syria', 'ot')]
        for country in countries:
            AddMethods.add_country(country)

    @staticmethod
    def create_example_permissions():
        permissions = [('add_records',), ('edit_records',), ('remove_records',), ('view_records',), ('view_users',),
                       ('view_records_full_detail',), ('can_consult',)]
        real_perms = [getattr(StaticPermissionNames, x) for x in dir(StaticPermissionNames) if not x.startswith("__")]
        for rperm in real_perms:
            if (rperm,) not in permissions:
                permissions.append((rperm,))

        for perm in permissions:
            AddMethods.add_permission(perm)

    @staticmethod
    def create_rlcs():
        rlcs = ((1, 'RLC Muenchen', False, True),
                (2, 'RLC Hamburg', False, True),
                (3, 'RLC Leipzig', False, True))
        for rlc in rlcs:
            AddMethods.add_rlc(rlc)

    @staticmethod
    def create_real_permissions():
        permissions = [getattr(StaticPermissionNames, x) for x in dir(StaticPermissionNames) if not x.startswith("__")]
        for permission in permissions:
            AddMethods.add_permission(permission)

    @staticmethod
    def create_real_tags():
        tags = [('Familiennachzug',), ('Dublin III',), ('Arbeitserlaubnis',), ('Flüchtlingseigenschaft',),
                ('subsidiärer Schutz',), ('Eheschließung',), ('Verlobung',), ('illegale Ausreise aus dem Bundesgebiet',),
                ('Untertauchen',), ('Kinder anerkennen',), ('Ausbildung',), ('Geburt ',), ('Eines Kindes im Asylverfahren',),
                ('Duldung',), ('Ausbildungsduldung',), ('Visum',), ('Anhörung',), ('Wechsel der Unterkunft',), ('Wohnsitzauflage',),
                ('Folgeantrag',), ('Zweitantrag',), ('Unterbringung im Asylverfahren',),
                ('Widerruf und Rücknahme der Asylberechtigung',), ('Passbeschaffung',), ('Mitwirkungspflichten',),
                ('Nichtbetreiben des Verfahrens',), ('Krankheit im Asylverfahren',), ('Familienasyl',), ('UmF',),
                ('Familienzusammenführung nach Dublin III',), ('Negativbescheid',), ('Relocation',), ('Resettlement',),
                ('Asylbewerberleistungsgesetz',), ('Kirchenasyl',), ('Asylantrag',), ('Abschiebung',), ('Untätigkeitsklage',),
                ('Studium',)]
        for tag in tags:
            AddMethods.add_tag(tag)

    @staticmethod
    def create_real_starting_rlcs():
        rlcs = (('RLC München', False, True),
                ('RLC Hamburg', False, True))
        for rlc in rlcs:
            AddMethods.add_rlc(rlc)
        return list(Rlc.objects.all())

    @staticmethod
    def create_real_groups(rlcs):
        groups = [('Members', False),
                  ('Admins', False),
                  ('Consultants', False)]
        for rlc in rlcs:
            for group in groups:
                AddMethods.add_group(group, rlc.id)
        return list(Group.objects.all())

    @staticmethod
    def create_good_example_records():
        r = Record(creator_id=1, from_rlc_id=1, created_on=date(2017, 12, 24),
                   last_edited=datetime(2018, 4, 12, 13, 56, 0, 0), client=1, first_contact_date=date(2017, 12, 24),
                   last_contact_date=datetime(2018, 4, 12, 18, 30, 0, 0), record_token='AZ-MUC-14/28',
                   note='was in italy before', state='op')
        r.tagged.add(12)
        r.working_on_record.add(1)
        r.save()

    @staticmethod
    def create_handmade_examples():
        tags = [(1001, 'Familiennachzug'),
                (1002, 'Ausbildung'),
                (1003, 'Anhörung'),
                (1004, 'Abschiebung'),
                (1005, 'Asylantrag')
                ]
        for tag in tags:
            AddMethods.add_tag(tag)

        countries = [(2001, 'Italien', 'ot'),
                     (2002, 'Syrien', 'so'),
                     (2003, 'Norwegen', 'st')
                     ]
        for country in countries:
            AddMethods.add_country(country)

        rlcs = [
            (
                3001,
                'Hamburg Bucerius Law School',
                True,                               # visible
                True,                               # part of umbrella
                'beraten auch zu Familienrecht, Sozialrecht und Arbeitsrecht'
            ),
            (
                3002,
                'Hamburg Universität',
                True,
                True,
                'bieten Anhörungsvorbereitung, Studierende können zum Teil Farsi und Arabisch'
            ),
            (
                3003,
                'München',
                False,
                True,
                'gut organisiertes Ausbildungsprogramm'
            )
        ]
        for rlc in rlcs:
            AddMethods.add_rlc(rlc)

        users = [
            (
                4001,
                'ludwig.maximilian@outlook.de',
                'Ludwig Maximilian',
                date(1985, 5, 12),                  # birthday
                '01732421123',
                'Maximilianstrasse 12',
                'München',
                '80539',
                [3003]                              # rlc_member
            ),
            (
                4002,
                'xxALIxxstone@hotmail.com',
                'Albert Einstein',
                date(1879, 3, 14),
                '01763425656',
                'Blumengasse 23',
                'Hamburg',
                '83452',
                [3001]
            ),
            (
                4003,
                'mariecurry53@hotmail.com',
                'Marie Curie',
                date(1867, 11, 7),
                '0174565656',
                'Jungfernstieg 2',
                'Hamburg',
                '34264',
                [3001]
            ),
            (
                4004,
                'max.mustermann@gmail.com',
                'Maximilian Gustav Mustermann',
                date(1997, 10, 23),
                '0176349756',
                'Schlossallee 100',
                'Grünwald',
                '82031',
                [3003]
            ),
            (
                4005,
                'petergustav@gmail.com',
                'Peter Klaus Gustav von Guttenberg',
                date(1995, 3, 11),
                '01763423732',
                'Leopoldstrasse 31',
                'Muenchen',
                '80238',
                [3003]
            )
        ]
        for user in users:
            AddMethods.add_user(user)

        clients = [
            (
                5001,
                date(2018, 7, 12),
                datetime(2018, 8, 28, 21, 3, 0, 0),
                'Bibi Aisha',
                'auf Flucht von Ehemann getrennt worden',
                '01793456542',
                date(1990, 5, 1),
                2002
            ),
            (
                5002,
                date(2017, 3, 17),
                datetime(2017, 12, 24, 12, 2, 0, 0),
                'Mustafa Kubi',
                'möchte eine Ausbildung beginnen',
                '01456378963',
                date(1998, 12, 3),
                2002
            ),
            (
                5003,
                date(2018, 1, 1),
                datetime(2018, 3, 3, 14, 5, 0, 0),
                'Ali Baba',
                'fragt wie er seine deutsche Freundin heiraten kann',
                '01345626534',
                date(1985, 6, 27),
                2002
            ),
            (
                5004,
                date(2018, 8, 1),
                datetime(2018, 8, 2, 16, 3, 0, 0),
                'Kamila Iman',
                'möchte zu ihrer Schwester in eine andere Aufnahmeeinrichtung ziehen',
                '01562736778',
                date(1956, 4, 3),
                2002
            )
        ]
        for client in clients:
            AddMethods.add_client(client)

        records = [
            (
                7001,                                   # id
                4001,                                   # creator id
                3003,                                   # rlc id
                date(2018, 7, 12),                      # created
                datetime(2018, 8, 29, 13, 54, 0, 0),    # las edited
                5001,                                   # client
                date(2018, 7, 10),                      # first contact
                datetime(2018, 8, 14, 17, 30, 0, 0),    # last contact
                'AZ-123/18',                            # record token
                'cl',                                   # status, cl wa op
                [4001],                                 # working on
                [1001, 1002]                            # tags
            ), (
                7002,
                4004,
                3003,
                date(2018, 6, 23),
                datetime(2018, 8, 22, 23, 3, 0, 0),
                5002,
                date(2018, 6, 20),
                datetime(2018, 7, 10, 17, 30, 0, 0),
                'AZ-124/18',
                'op',
                [4004, 4001],
                [1003, 1004]
            ), (
                7003,
                4005,
                3003,
                date(2018, 8, 24),
                datetime(2018, 8, 31, 1, 2, 0, 0),
                5003,
                date(2018, 8, 22),
                datetime(2018, 8, 22, 18, 30, 0, 0),
                'AZ-125/18',
                'wa',
                [4005, 4001],
                [1001, 1004]
            ), (
                7004,
                4001,
                3003,
                date(2018, 3, 10),
                datetime(2018, 4, 30, 19, 22, 0, 0),
                5004,
                date(2018, 3, 9),
                datetime(2018, 3, 24, 15, 54, 0, 0),
                'AZ-126/18',
                'cl',
                [4005, 4004],
                [1005, 1001]
            )]
        for record in records:
            AddMethods.add_record(record)

        groups = [
            (
                6001,
                4002,  # id des Nutzers der die Gruppe erstellt hat
                3001,  # id der RLC zu der die Gruppe gehoert
                'RLC Hamburg Bucerius Law School members',  # name der Gruppe
                False,  # gibt an ob die Gruppe fuer alle sichtbar ist
                [4002, 4003]  # IDs aller Nutzer die in der Gruppe sind
            ),
            (
                6002,
                4001,
                3003,
                'RLC München member',
                False,
                [4001, 4004]
            ),
            (
                6003,
                4001,
                3003,
                'RLC München board_member',
                False,
                [4001]
            )
        ]
        for group in groups:
            AddMethods.add_group(group)


class AddMethods:
    @staticmethod
    def add_user(user):
        """
        creates a user in database with provided values
        Args:
            user: (email [string], name [string], is_superuser [bool], password [string]) or
                (id [number], email [string], name [string], is_superuser [bool], password [string])

        Returns:

        """
        if user.__len__() == 4:
            us = UserProfile(email=user[0], name=user[1], is_superuser=user[2], is_active=True)
            us.set_password(user[3])
        elif user.__len__() == 5:
            us = UserProfile(id=user[0], email=user[1], name=user[2], is_superuser=user[3], is_active=True)
            us.set_password(user[4])
        elif user.__len__() == 9:
            us = UserProfile(id=user[0], email=user[1], name=user[2], birthday=user[3], phone_number=user[4],
                             street=user[5], city=user[6], zip_code=user[7])
            us.set_password('qwe123')
            us.save()
            for rlc_id in user[8]:
                us.rlc_members.add(Rlc.objects.get(pk=rlc_id))
        else:
            raise AttributeError
        us.save()

    @staticmethod
    def add_rlc(rlc):
        """
        creates rlc in database with provided values
        Args:
            rlc: (name [String], uni_tied [bool], part_of_umbrella [bool]) or
                (id[number], name [String], uni_tied [bool], part_of_umbrella [bool])

        Returns:

        """
        if rlc.__len__() == 3:
            lc = Rlc(name=rlc[0], uni_tied=rlc[1], part_of_umbrella=rlc[2])
        elif rlc.__len__() == 4:
            lc = Rlc(id=rlc[0], name=rlc[1], uni_tied=rlc[2], part_of_umbrella=rlc[3])
        elif rlc.__len__() == 5:
            lc = Rlc(id=rlc[0], name=rlc[1], uni_tied=rlc[2], part_of_umbrella=rlc[3], note=rlc[4])
        else:
            raise AttributeError
        lc.save()

    @staticmethod
    def add_permission(permission):
        """
        creates permissions in database
        Args:
            permission: (name of permission [String}) or
                        (id [number], permissionName [String])

        Returns:

        """
        if isinstance(permission, str):
            perm = Permission(name=permission)
        elif permission.__len__() == 2:
            perm = Permission(id=permission[0], name=permission[1])
        else:
            raise AttributeError
        perm.save()

    @staticmethod
    def add_tag(tag):
        """
        creates tag in database
        Args:
            tag: (name of tag [String]) or
                (id [number], name [String])

        Returns:

        """
        if tag.__len__() == 1:
            t = Tag(name=tag[0])
        elif tag.__len__() == 2:
            t = Tag(id=tag[0], name=tag[1])
        else:
            raise AttributeError
        t.save()

    @staticmethod
    def add_country(country):
        """
        creates OriginCountry in database with provided values
        Args:
            country: (name [String], state [string, length=2, compare to OriginCountry model) or
                    (id [number], name [String], state [string, length=2, compare to OriginCountry model)
        Returns:

        """
        if country.__len__() == 2:
            c = OriginCountry(name=country[0], state=country[1])
        elif country.__len__() == 3:
            c = OriginCountry(id=country[0], name=country[1], state=country[2])
        else:
            raise AttributeError
        c.save()

    @staticmethod
    def add_to_rlc(user_id, rlc_id):
        """
        add the user with user_id as a member to the rlc with rlc_id
        Args:
            user_id: id of the user which will be added
            rlc_id: id of the rlc which will the user will be added  to

        Returns:

        """
        rlc = Rlc.objects.get(pk=rlc_id)
        user = UserProfile.objects.get(pk=user_id)
        user.rlc_members.add(rlc)

    @staticmethod
    def add_group(group):
        if group.__len__() == 3:
            g = Group(name=group[0], visible=group[1], from_rlc_id=group[2])
        elif group.__len__() == 6:
            g = Group(id=group[0], creator_id=group[1], from_rlc_id=group[2], name=group[3], visible=group[4])
            g.save()
            for user_id in group[5]:
                g.group_members.add(UserProfile.objects.get(pk=user_id))
        else:
            raise AttributeError
        g.save()

    @staticmethod
    def add_client(client):
        if client.__len__() == 8:
            cl = Client(id=client[0], created_on=client[1], last_edited=client[2], name=client[3], note=client[4],
                        phone_number=client[5], birthday=client[6], origin_country_id=client[7])
            cl.save()

    @staticmethod
    def add_record(record):
        if record.__len__() == 12:
            rc = Record(id=record[0], creator_id=record[1], from_rlc_id=record[2], created_on=record[3],
                        last_edited=record[4], client_id=record[5], first_contact_date=record[6], last_contact_date=record[7],
                        record_token=record[8], state=record[9])
            rc.save()
            for user_id in record[10]:
                rc.working_on_record.add(UserProfile.objects.get(pk=user_id))
            for tag_id in record[11]:
                rc.tagged.add(Tag.objects.get(pk=tag_id))
            rc.save()
