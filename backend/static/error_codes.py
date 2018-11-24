#  rlcapp - record and organization management software for refugee law clinics
#  Copyright (C) 2018  Dominik Walser
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

ERROR__API__DOWNLOAD__NO_SUCH_KEY = {
    "error_code": "api.download.no_such_key",
    "error": "no such filekey to download"
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

ERROR__API__LOGIN__WRONG_PASSWORD = {
    'error': 'wrong password',
    'error_token': 'api.login.wrong_password'
}

ERROR__API__LOGIN__NO_ACCOUNT = {
    'error': 'there is no account with this email address',
    'error_token': 'api.login.no_account'
}

ERROR__API__STORAGE__CHECK_FILE_NOT_FOUND = {
    'error': 'no such file found, checking error',
    'error_token': 'api.storage.check_file_not_found'
}

ERROR__API__STORAGE__DIR_NOT_FOUND = {
    'error': 'the directory doesnt exist',
    'error_token': 'api.storage.dir_not_found'
}

ERROR__API__STORAGE__DIR_EMPTY = {
    'error': 'there are no files in the specified dir',
    'error_token': 'api.storage.dir_empty'
}

ERROR__RECORD__MESSAGE__NO_MESSAGE_PROVIDED = {
    'error': 'there was no message provided in the request',
    'error_token': 'record.message.no_message'
}

ERROR__API__PERMISSION__INSUFFICIENT = {
    'error': 'insufficient permission to perform action',
    'error_token': 'api.permissions.insufficient'
}
