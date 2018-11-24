
from rest_framework.test import APIClient
from django.test import TransactionTestCase
from ..models import UserProfile, Rlc
from .fixtures import CreateFixtures
from .statics import StaticTestMethods
from rest_framework.authtoken.models import Token


class StorageTest(TransactionTestCase):
    def setUp(self):
        self.client = StaticTestMethods.force_authentication()
        self.base_url = '/api/storage_down/'

    def test_generate_download_url(self):
        self.client.get('{}?file={}'.format(self.base_url, 'storagefolder/1/abc.pdf'))

