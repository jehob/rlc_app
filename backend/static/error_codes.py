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

ERROR__API__DOWNLOAD__NO_SUCH_KEY = {
    "error_code": "api.download.no_such_key",
    "error": "no such key to download"
}
ERROR__API__DOWNLOAD__NO_FILE_SPECIFIED = {
    'error': 'no file specified',
    'error_code': 'api.download.no_file_specified'
}
ERROR__API__UPLOAD__NO_FILE = {
    'error': 'no file to upload',
    'error_code': 'api.upload.no_file'
}
ERROR__RECORD__RETRIEVE_RECORD__WRONG_RLC = {
    'error': 'wrong rlc, the record is in another rlc',
    'error_token': 'record.retrieve_record.wrong_rlc'
}
ERROR__RECORD__RECORD__NOT_EXISTING = {
    'error': 'the record with the given id does not exist',
    'error_token': 'record.record.not_existing'
}
ERROR__RECORD__UPLOAD__NO_FILE_NAME = {
    'error': 'no file name',
    'error_token': 'record.upload.no_file_name'
}
ERROR__RECORD__UPLOAD__NO_FILE_TYPE = {
    'error': 'no file type',
    'error_token': 'record.upload.no_file_type'
}
ERROR__RECORD__UPLOAD__NAMES_TYPES_LENGTH_MISMATCH = {
    'error': 'the provided names and types are not equal in length',
    'error_token': 'record.upload.names_types_length_mismatch'
}
