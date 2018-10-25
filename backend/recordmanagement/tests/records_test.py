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


class RecordTests(TransactionTestCase):
    def setUp(self):
        self.client = StaticTestMethods.force_authentication()
        self.base_full_detail_url = '/api/records_full_detail/'
        self.base_no_detail_url = '/api/records_no_detail/'
        CreateFixtures.create_sample_clients()
        CreateFixtures.create_sample_rlcs()
        self.user = UserProfile.objects.get(email='test123@test.com')
        self.user.rlc_members.add(Rlc.objects.first())

    def test_create_record_success(self):
        before = Record.objects.count()
        client = Client.objects.first()
        rlc = self.user.rlc_members.first()
        to_post = {
            'first_contact_date': '2018-04-03',
            'last_contact_date': '2018-04-25T10:36:48Z',
            'record_token': 'ABC12838,23',
            'note': 'important note',
            'state': 'op',
            'from_rlc': rlc.id,
            'client': client.id,
            'working_on_record': self.user.id
        }
        response = self.client.post(self.base_full_detail_url, to_post)
        after = Record.objects.count()
        self.assertTrue(response.status_code == 201)
        self.assertTrue(before + 1 == after)
        self.assertEquals(self.user.id, response.data['creator'])

    def test_show_all_records_full_detail_superuser(self):
        response = self.client.get(self.base_full_detail_url)
        self.assertTrue(response.status_code == 405)

    def test_show_records_full_detail_normal_user(self):
        before = Record.objects.count()
        created = CreateFixtures.create_sample_records().__len__()

        client = APIClient()
        user = list(UserProfile.objects.filter(is_superuser=False))[0]
        client.force_authenticate(user=user)

        response = client.get(self.base_full_detail_url)

        records_seen_by_user = list(response.data)
        records_which_should_be_seen = list(Record.objects.filter(
            id__in=list(user.working_on_record.values_list('id', flat=True))
        ))
        records_in_db = Record.objects.count()

        self.assertTrue(response.status_code == 200)
        self.assertTrue(created + before == records_in_db)
        self.assertTrue(records_seen_by_user.__len__() == records_which_should_be_seen.__len__())
        for i in range(records_seen_by_user.__len__()):
            self.assertTrue(records_seen_by_user[i]['id'] == records_which_should_be_seen[i].id)

    def test_show_records_no_detail_normal_user(self):
        before = Record.objects.count()
        created = CreateFixtures.create_sample_records().__len__()

        client = APIClient()
        user = list(UserProfile.objects.filter(is_superuser=False))[0]
        client.force_authenticate(user=user)

        response = client.get(self.base_no_detail_url)

        records_seen_by_user = list(response.data)
        records_which_should_be_seen = list(Record.objects.exclude(
            id__in=user.working_on_record.values_list('id', flat=True)
        ))
        records_in_db = Record.objects.count()

        self.assertTrue(response.status_code == 200)
        self.assertTrue(created + before == records_in_db)
        self.assertTrue(records_seen_by_user.__len__() == records_which_should_be_seen.__len__())
        for i in range(records_seen_by_user.__len__()):
            self.assertTrue(records_seen_by_user[i]['id'] == records_which_should_be_seen[i].id)
