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
from rest_framework.test import APIClient
from django.test import TransactionTestCase
from backend.api.models import UserProfile, Rlc
from backend.recordmanagement.models import Record, Client
from backend.api.tests.fixtures import CreateFixtures
from backend.api.tests.statics import StaticTestMethods
from backend.static.permissions import *
from datetime import date, datetime


class RecordTests(TransactionTestCase):
    def setUp(self):
        self.client = StaticTestMethods.force_authentication()
        self.base_list_url = '/api/records/records/'
        self.base_detail_url = '/api/records/record/'
        self.base_create_record_url = '/api/records/create_record/'

    def test_create_record_new_client_success(self):
        users, rlcs, client, tags = RecordTests.create_samples()
        client = StaticTestMethods.force_authentication_with_user(users[0].email)

        all_records_before = Record.objects.count()
        to_post = {
            "client_birthday": date(2000, 3, 21),
            "client_name": "Mubaba Baba",
            "client_phone_number": "123123123",
            "client_note": "new client note",
            "first_contact_date": date(2018, 8, 30),
            "record_token": "AZ12391-123",
            "consultants": [2],
            "tags": [1],
            "record_note": "new record note"
        }
        response = client.post(self.base_create_record_url, to_post)
        all_records_after = Record.objects.count()
        self.assertTrue(response.status_code == 200)
        self.assertTrue(all_records_before + 1 == all_records_after)

    def test_list_just_own_rlc_records(self):
        """
        this can crash if test method "test_create_record_new_client_success" is red
        :return:
        """
        users, rlcs, record = self.create_first_record()
        client = StaticTestMethods.force_authentication_with_user(users[0].email)

        response = client.get(self.base_list_url)
        after_creation_user_counting = response.data
        self.assertTrue(response.status_code == 200)
        self.assertTrue(after_creation_user_counting.__len__() == 1)
        self.assertTrue(after_creation_user_counting[0]['id'] == record['id'])

    def test_list_no_record_from_other_rlc(self):
        users, rlcs, record = self.create_first_record()
        client = StaticTestMethods.force_authentication_with_user(users[2].email)

        response = client.get(self.base_list_url)
        self.assertTrue(response.status_code == 200)
        self.assertTrue(response.data.__len__() == 0)

    def test_retrieve_record_success(self):
        users, rlcs, record = self.create_first_record()
        client = StaticTestMethods.force_authentication_with_user(users[1].email)

        response = client.get(self.base_detail_url + str(record['id']) + '/')
        self.assertTrue(response.data.__len__() == 3)

    def test_retrieve_record_wrong_rlc_error(self):
        users, rlcs, record = self.create_first_record()
        client = StaticTestMethods.force_authentication_with_user(users[2].email)

        response = client.get(self.base_detail_url + str(record['id']) + '/')
        self.assertTrue('error' in response.data)

    @staticmethod
    def create_samples():
        """

        :return:
        """
        users = [CreateFixtures.add_user(1, "qqq@web.de", "qqq", "asd123"),
                 CreateFixtures.add_user(2, "aa@web.de", "aa", "asd123"),
                 CreateFixtures.add_user(3, "bb@web.de", "bb", "asd123")]
        rlc1 = CreateFixtures.add_rlc(10, "munich", [1, 2, ], True, False, "best rlc in the world")
        rlc2 = CreateFixtures.add_rlc(11, "berlin", [3, ], True, False, "second best rlc in the world")
        origin_country = CreateFixtures.add_country(30, "Botswana", "st")
        client = CreateFixtures.add_client(20, "Peter Parker", "batman", "1929129912", date.today(), 30)
        tags = CreateFixtures.add_tags([(1, "Abschiebung"), (2, "Familiennachzug")])

        permission = CreateFixtures.add_permission(90, PERMISSION_CAN_VIEW_RECORDS)
        CreateFixtures.add_permission(91, PERMISSION_VIEW_RECORDS_FULL_DETAIL)
        CreateFixtures.add_has_permission(100, permission.id, rlc_has=rlc1.id, for_rlc=rlc1.id)
        CreateFixtures.add_has_permission(101, permission.id, rlc_has=rlc2.id, for_rlc=rlc2.id)
        return users, [rlc1, rlc2], client, tags

    def create_first_record(self):
        users, rlcs, client, tags = RecordTests.create_samples()
        client = StaticTestMethods.force_authentication_with_user(users[0].email)

        to_post = {
            "client_birthday": date(2000, 3, 21),
            "client_name": "Mubaba Baba",
            "client_phone_number": "123123123",
            "client_note": "new client note",
            "first_contact_date": date(2018, 8, 30),
            "record_token": "AZ12391-123",
            "consultants": [2],
            "tags": [1],
            "record_note": "new record note"
        }
        response = client.post(self.base_create_record_url, to_post)
        new_record = response.data
        return users, rlcs, new_record
