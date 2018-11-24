
from django.test import TransactionTestCase
from backend.static.storage_folders import is_storage_folder_of_record


class StorageFolderTests(TransactionTestCase):
    def setUp(self):
        pass

    def test_is_storage_folder_success(self):
        folder = 'rlcs/123/records/123/'
        self.assertTrue(is_storage_folder_of_record(folder))

    def test_is_storage_folder_success_without_slash_at_end(self):
        folder = 'rlcs/123/records/123'
        self.assertTrue(is_storage_folder_of_record(folder))

    def test_is_storage_folder_error(self):
        folder = 'aa/123/records/123/'
        self.assertTrue(not is_storage_folder_of_record(folder))

    def test_is_storage_folder_error_2(self):
        folder = 'rlcs/123a/records/123/'
        self.assertTrue(not is_storage_folder_of_record(folder))
