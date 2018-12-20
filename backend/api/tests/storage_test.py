from django.test import TransactionTestCase
from .statics import StaticTestMethods


class StorageTest(TransactionTestCase):
    def setUp(self):
        self.client = StaticTestMethods.force_authentication()
        self.base_url = '/api/storage_down/'

    def test_generate_download_url(self):
        self.client.get('{}?file={}'.format(self.base_url, 'storagefolder/1/abc.pdf'))


