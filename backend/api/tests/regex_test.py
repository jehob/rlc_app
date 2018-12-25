from django.test import TransactionTestCase
from backend.static.regex_validators import is_storage_folder_of_record, is_phone_number


class RegexTests(TransactionTestCase):
    def setUp(self):
        pass

    def test_array(self, values, method_to_check):
        for value in values:
            b = method_to_check(value)
            a = 10
            self.assertTrue(method_to_check(value))

    def test_is_storage_folder_success(self):
        folder = 'rlcs/123/records/123/'
        self.assertTrue(is_storage_folder_of_record(folder))
        folder = 'rlcs/123/records/123'
        self.assertTrue(is_storage_folder_of_record(folder))

    def test_is_storage_folder_error(self):
        folder = 'aa/123/records/123/'
        self.assertTrue(not is_storage_folder_of_record(folder))
        folder = 'rlcs/123a/records/123/'
        self.assertTrue(not is_storage_folder_of_record(folder))

    def test_is_phone_number_success(self):
        numbers = [
            '0753939209',
            '07539 39209',
            '08923738',
            # '07539-39209',
            # '07539/39209'
        ]
        self.test_array(numbers, is_phone_number)






