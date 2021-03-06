/*
 * rlcapp - record and organization management software for refugee law clinics
 * Copyright (C) 2019  Dominik Walser
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>
 ******************************************************************************/

export const LOGIN_API_URL = "api/login/";
export const RECORDS_API_URL = "api/records/records/";
export const CLIENTS_BY_BIRTHDAY_API_URL = "api/records/clients_by_birthday/";
export const RECORDS_STATICS_API_URL = "api/records/statics/";
export const PROFILES_API_URL = "api/profiles/";
export const CREATE_PROFILE_API_URL = "api/create_profile/";
export const CREATE_RECORD_API_URL = "api/records/create_record/";
export const RLCS_API_URL = "api/get_rlcs/";
export const UPLOAD_SIGNING_BASE_API_URL = "api/storage_up/";
export const RECORD_PERMISSIONS_LIST_API_URL = "api/records/record_permission_requests/";
export const FORGOT_PASSWORD_API_URL = "api/forgot_password/";
export const GROUPS_API_URL = "api/groups/";
export const GROUP_MEMBER_API_URL = "api/group_member/";
export const PERMISSION_API_URL = "api/permissions/";
export const HAS_PERMISSION_API_URL = "api/has_permission/";
export const HAS_PERMISSIONS_STATICS_API_URL = "api/has_permission_statics/";
export const NEW_USER_REQUEST_API_URL = "api/new_user_request/";
export const NEW_USER_REQUEST_ADMIT_API_URL = "api/new_user_request_admit/";
export const LOGOUT_API_URL = 'api/logout/';
export const INACTIVE_USERS_API_URL = 'api/inactive_users/';
export const USER_HAS_PERMISSIONS_API_URL = 'api/user_has_permissions/';

const CHECK_USER_ACTIVATION_API_URL = "api/check_user_activation_link/";
const ACTIVATE_USER_ACTIVATION_API_URL = "api/activate_user_activation_link/";
const RESET_PASSWORD_API_URL = "api/reset_password/";
const SPECIAL_RECORD_BASE_API_URL = "api/records/record/";
const DOWNLOAD_SIGNING_BASE_API_URL = "api/storage_down/";
const RECORD_DOCUMENT_BASE_API_URL = "api/records/documents/";
const PERMISSION_FOR_GROUP_BASE_API_URL = "api/permissions_for_group/";
const DOWNLOAD_ALL_RECORD_DOCUMENTS_BASE_API_URL = "api/records/documents_download/";

export const GetSpecialProfileApiURL = (id: string | number) => {
    return `${PROFILES_API_URL}${id}/`;
};

export const GetRecordsSearchApiURL = (toSearch: string) => {
    return `${RECORDS_API_URL}?search=${toSearch}`;
};

export const GetSpecialRecordApiURL = (id: string | number) => {
    return `${SPECIAL_RECORD_BASE_API_URL}${id}/`;
};

export const GetDownloadApiUrl = (file: string) => {
    return `${DOWNLOAD_SIGNING_BASE_API_URL}?file=${file}`;
};

export const GetUploadApiUrl = (file: File, fileDirectory: string = '') => {
    return `${UPLOAD_SIGNING_BASE_API_URL}?file_name=${file.name}&file_type=${file.type}&file_dir=${fileDirectory}`;
};

export const GetCreateRecordDocumentApiUrl = (record_id: string) => {
    return `${SPECIAL_RECORD_BASE_API_URL}${record_id}/documents`;
};

export const GetAddRecordMessageApiUrl = (record_id: string) => {
    return `${SPECIAL_RECORD_BASE_API_URL}${record_id}/messages`;
};

export const GetRecordDocumentApiUrl = (document_id: string) => {
    return `${RECORD_DOCUMENT_BASE_API_URL}${document_id}/`;
};

export const GetRecordPermissionRequestApiUrl = (record_id: string) => {
    return `${SPECIAL_RECORD_BASE_API_URL}${record_id}/request_permission`;
};

export const GetResetPasswordApiUrl = (link_id: string) => {
    return `${RESET_PASSWORD_API_URL}${link_id}/`;
};

export const GetSpecialGroupApiURL = (id: string | number) => {
    return `${GROUPS_API_URL}${id}/`;
};

export const GetSpecialPermissionApiURL = (id: string | number) => {
    return `${PERMISSION_API_URL}${id}/`;
};

export const GetSpecialHasPermissionApiURL = (id: string | number) => {
    return `${HAS_PERMISSION_API_URL}${id}/`;
};

export const GetPermissionsForGroupApiURL = (id: string | number) => {
    return `${PERMISSION_FOR_GROUP_BASE_API_URL}${id}/`;
};

export const GetCheckUserActivationApiUrl = (link: string) => {
    return `${CHECK_USER_ACTIVATION_API_URL}${link}/`;
};

export const GetActivateUserApiUrl = (link: string) => {
    return `${ACTIVATE_USER_ACTIVATION_API_URL}${link}/`;
};

export const GetDownloadAllRecordDocumentsApiUrl = (record_id: string) => {
    return `${DOWNLOAD_ALL_RECORD_DOCUMENTS_BASE_API_URL}${record_id}/`;
};

