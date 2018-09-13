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
from datetime import date, datetime
from ..models import OriginCountry, Client, UserProfile, Record, HasPermission, Permission, Group, Tag, Rlc


class CreateFixtures:
    @staticmethod
    def create_sample_countries():
        CreateFixtures.add_country(9, 'Nigeria', 'st')
        CreateFixtures.add_country(10, 'Egypt', 'ot')
        CreateFixtures.add_country(11, 'Korea', 'so')
        CreateFixtures.add_country(12, 'USA', 'ot')
        return list(OriginCountry.objects.all())

    @staticmethod
    def create_sample_users():
        CreateFixtures.add_user(2, 'peter_parker@gmx.de', 'Peter Parker', 'abc123')
        CreateFixtures.add_user(3, 'batman@gmx.de', 'Bruceee Wayne', 'XXthepasswordXX')
        CreateFixtures.add_user(4, 'soyummy@aol.to', 'The Boss', 'original')
        return list(UserProfile.objects.all())

    @staticmethod
    def create_sample_clients():
        countries = CreateFixtures.create_sample_countries()

        CreateFixtures.add_client(1, 'Tex Thompson', 'Americommando', 287389352, '1910-3-24', countries[0].id)
        CreateFixtures.add_client(2, 'Percy Pilbeam', 'Big E', 293829842, '2000-12-30',
                                  countries[1 % countries.__len__()].id)
        CreateFixtures.add_client(3, 'Boston Brand', 'Deadman', 183743430, '1990-12-24',
                                  countries[2 % countries.__len__()].id)
        return list(Client.objects.all())

    @staticmethod
    def create_sample_records():
        users = CreateFixtures.create_sample_users()
        corresponding_client = list(Client.objects.all())[0]
        CreateFixtures.add_record(1, date(2018, 4, 3), datetime(2018, 4, 25, 10, 26, 48), 'ABC1283238,23',
                                  'important note', 'op', corresponding_client.id, [users[0 % users.__len__()].id])
        CreateFixtures.add_record(2, date(2018, 4, 3), datetime(2018, 4, 25, 10, 26, 48), 'ACD2838,23',
                                  'AA', 'wa', corresponding_client.id, [users[0 % users.__len__()].id])
        CreateFixtures.add_record(3, date(2018, 4, 3), datetime(2018, 4, 25, 10, 26, 48), 'XXX12838,23',
                                  'BB', 'cl', corresponding_client.id, [users[1 % users.__len__()].id])
        return list(Record.objects.all())

    @staticmethod
    def create_sample_groups():
        users = CreateFixtures.create_sample_users()
        CreateFixtures.add_group(1, 'Group1', True, [users[0].id])
        CreateFixtures.add_group(2, 'Group2', True, [users[1 % users.__len__()].id, users[0].id])
        CreateFixtures.add_group(3, 'Group3', True, [users[1 % users.__len__()].id, users[2 % users.__len__()].id])
        return list(Group.objects.all())

    @staticmethod
    def create_sample_permissions():
        CreateFixtures.add_permission(1, 'add_records')
        CreateFixtures.add_permission(2, 'edit_records')
        CreateFixtures.add_permission(3, 'delete_records')
        CreateFixtures.add_permission(4, 'view_records')
        return list(Permission.objects.all())

    @staticmethod
    def create_sample_has_permissions():
        users = CreateFixtures.create_sample_users()
        permissions = CreateFixtures.create_sample_permissions()
        groups = CreateFixtures.create_sample_groups()
        CreateFixtures.add_has_permission(1, permissions[0].id, user_has=users[0].id,
                                          for_user=users[1 % users.__len__()].id)
        CreateFixtures.add_has_permission(2, permissions[1].id, user_has=users[1].id,
                                          for_user=users[2 % users.__len__()].id)
        CreateFixtures.add_has_permission(3, permissions[2].id, group_has=groups[0].id,
                                          for_group=groups[1 % groups.__len__()].id)
        CreateFixtures.add_has_permission(4, permissions[0].id, group_has=groups[2 % groups.__len__()].id,
                                          for_group=groups[0 % groups.__len__()].id)
        return list(HasPermission.objects.all())

    @staticmethod
    def create_sample_rlcs():
        CreateFixtures.add_rlc(1, 'RlC A')
        CreateFixtures.add_rlc(2, 'RlC B')
        CreateFixtures.add_rlc(3, 'RlC C')


    # Helper Methods

    @staticmethod
    def add_group(id, name, visible, members):
        group = Group(id=id, name=name, visible=visible)
        group.save()
        for member in members:
            group.group_members.add(member)

    @staticmethod
    def add_groups(groups):
        for group in groups:
            CreateFixtures.add_group(group[0], group[1], group[2], group[3])

    @staticmethod
    def add_record(id, first, last, token, note, state, client, working):
        record = Record(id=id, first_contact_date=first, last_contact_date=last, record_token=token,
                        note=note, state=state, client_id=client)
        record.save()
        for user in working:
            record.working_on_record.add(user)

    @staticmethod
    def add_records(records):
        for record in records:
            CreateFixtures.add_record(record[0], record[1], record[2], record[3], record[4], record[5], record[6],
                                      record[7])

    @staticmethod
    def add_client(id, name, note, phone_number, birthday, origin):
        client = Client(id=id, name=name, note=note, phone_number=phone_number,
                        birthday=birthday, origin_country_id=origin)
        client.save()

    @staticmethod
    def add_clients(clients):
        for client in clients:
            CreateFixtures.add_client(client[0], client[1], client[2], client[3], client[4], client[5])

    @staticmethod
    def add_user(id, email, name, password):
        user = UserProfile(id=id, email=email, name=name, password=password)
        user.save()

    @staticmethod
    def add_users(users):
        for user in users:
            CreateFixtures.add_user(user[0], user[1], user[2], user[3])

    @staticmethod
    def add_country(id, name, state):
        country = OriginCountry(id=id, name=name, state=state)
        country.save()

    @staticmethod
    def add_countries(countries):
        for country in countries:
            CreateFixtures.add_country(country[0], country[1], country[2])

    @staticmethod
    def add_permission(id, name):
        permission = Permission(id=id, name=name)
        permission.save()

    @staticmethod
    def add_permissions(permissions):
        """

        Args:
            permissions: list of permissions to add, each a tuple (id, name)

        Returns:

        """
        for permission in permissions:
            CreateFixtures.add_permission(permission[0], permission[1])

    @staticmethod
    def add_has_permission(id, permission, user_has=None, group_has=None, rlc_has=None, for_user=None, for_group=None,
                           for_rlc=None):
        has_perm = HasPermission(id=id, permission_id=permission, user_has_permission_id=user_has,
                                 group_has_permission_id=group_has, rlc_has_permission_id=rlc_has,
                                 permission_for_user_id=for_user,
                                 permission_for_group_id=for_group, permission_for_rlc_id=for_rlc)
        has_perm.save()

    @staticmethod
    def add_has_permissions(has_permissions):
        for has_permission in has_permissions:
            CreateFixtures.add_has_permission(has_permission[0], has_permission[1], has_permission[2],
                                              has_permission[3], has_permission[4], has_permission[5],
                                              has_permission[6], has_permission[7])

    @staticmethod
    def add_rlc(id, name, members=None, uni=True, umbrella=True, notes=""):
        rlc = Rlc(id=id, name=name, uni_tied=uni, part_of_umbrella=umbrella, notes=notes)
        rlc.save()
        if members is not None:
            for member in members:
                rlc.rlc_members.add(member)

    @staticmethod
    def add_rlcs(rlcs):
        for rlc in rlcs:
            CreateFixtures.add_rlc(rlc[0], rlc[1], rlc[2], rlc[3], rlc[4], rlc[5])

    @staticmethod
    def add_group_to_rlc(group, rlc):
        Group.objects.get(id=group).from_rlc = Rlc.objects.get(id=rlc)

    @staticmethod
    def add_groups_to_rlcs(pairs):
        for pair in pairs:
            CreateFixtures.add_group_to_rlc(pair[0], pair[1])
