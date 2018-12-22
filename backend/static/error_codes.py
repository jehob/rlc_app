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
    "error_detail": "no such filekey to download"
}
ERROR__API__DOWNLOAD__NO_FILE_SPECIFIED = {
    'error_detail': 'no file specified',
    'error_code': 'api.download.no_file_specified'
}
ERROR__API__UPLOAD__NO_FILE = {
    'error_detail': 'no file to upload',
    'error_code': 'api.upload.no_file'
}
ERROR__RECORD__RETRIEVE_RECORD__WRONG_RLC = {
    'error_detail': 'wrong rlc, the record is in another rlc',
    'error_code': 'record.retrieve_record.wrong_rlc'
}
ERROR__RECORD__RECORD__NOT_EXISTING = {
    'error_detail': 'the record with the given id does not exist',
    'error_code': 'record.record.not_existing'
}
ERROR__RECORD__UPLOAD__NO_FILE_NAME = {
    'error_detail': 'no file name',
    'error_code': 'record.upload.no_file_name'
}
ERROR__RECORD__UPLOAD__NO_FILE_TYPE = {
    'error_detail': 'no file type',
    'error_code': 'record.upload.no_file_type'
}
ERROR__RECORD__UPLOAD__NAMES_TYPES_LENGTH_MISMATCH = {
    'error_detail': 'the provided names and types are not equal in length',
    'error_code': 'record.upload.names_types_length_mismatch'
}

ERROR__API__LOGIN__INVALID_CREDENTIALS = {
    'error_detail': 'wrong password or no account with this email',
    'error_code': 'api.login.invalid_credentials'
}

ERROR__API__STORAGE__CHECK_FILE_NOT_FOUND = {
    'error_detail': 'no such file found, checking error',
    'error_code': 'api.storage.check_file_not_found'
}

ERROR__API__STORAGE__DIR_NOT_FOUND = {
    'error_detail': 'the directory doesnt exist',
    'error_code': 'api.storage.dir_not_found'
}

ERROR__API__STORAGE__DIR_EMPTY = {
    'error_detail': 'there are no files in the specified dir',
    'error_code': 'api.storage.dir_empty'
}

ERROR__RECORD__MESSAGE__NO_MESSAGE_PROVIDED = {
    'error_detail': 'there was no message provided in the request',
    'error_code': 'record.message.no_message'
}

ERROR__API__PERMISSION__INSUFFICIENT = {
    'error_detail': 'insufficient permission to perform action',
    'error_code': 'api.permissions.insufficient'
}

ERROR__RECORD__DOCUMENT__NOT_FOUND = {
    'error_detail': 'document not found',
    'error_code': 'record.document.not_found'
}

ERROR__RECORD__DOCUMENT__NO_LINKED_RECORD = {
    'error_detail': 'no linked record to the document',
    'error_code': 'record.document.no_linked_record'
}

ERROR__RECORD__DOCUMENT__NO_TAG_PROVIDED = {
    'error_detail': 'no tag provided',
    'error_code': 'record.document.no_tag_provided'
}

ERROR__RECORD__DOCUMENT__TAG_NOT_EXISTING = {
    'error_detail': 'provided tag does not exist',
    'error_code': 'record.document.tag_not_existing'
}

ERROR__RECORD__CLIENT__NOT_EXISTING = {
    'error_detail': 'provided tag does not exist',
    'error_code': 'record.document.tag_not_existing'
}

ERROR__RECORD__PERMISSION__ALREADY_WORKING_ON = {
    'error_detail': 'the user is already working on the client',
    'error_code': 'record.permission.already_working_on'
}

ERROR__RECORD__PERMISSION__ALREADY_REQUESTED = {
    'error_detail': 'already requested a permission for the record',
    'error_code': 'record.permission.already_requested'
}

ERROR__RECORD__PERMISSION__ID_NOT_FOUND = {
    'error_detail': 'recordpermissionrequest with this id not found',
    'error_code': 'record.permission.id_not_found'
}

ERROR__RECORD__PERMISSION__ID_NOT_PROVIDED = {
    'error_detail': 'recordpermissionrequest not provided',
    'error_code': 'record.permission.id_not_provided'
}

ERROR__RECORD__PERMISSION__NO_ACTION_PROVIDED = {
    'error_detail': 'no action in request.data provided',
    'error_code': 'record.permission.no_action_provided'
}

ERROR__RECORD__PERMISSION__NO_VALID_ACTION_PROVIDED = {
    'error_detail': 'no action in request.data provided',
    'error_code': 'record.permission.no_action_provided'
}

ERROR__RECORD__PERMISSION__NO_REQUESTS_FOUND = {
    'error_detail': 'no requests in database',
    'error_code': 'record.permission.no_requests_found'
}

ERROR__API__REGISTER__NO_RLC_PROVIDED = {
    'error_detail': 'no rlc was provided',
    'error_code': 'api.register.no_rlc_provided'
}
