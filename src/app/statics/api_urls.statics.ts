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

export const LOGIN_URL = "api/login/";
export const RECORDS_URL = "api/records/records/";
export const CLIENTS_BY_BIRTHDAY_URL = "api/records/clients_by_birthday/";
export const RECORDS_STATICS_URL = "api/records/statics/";
export const PROFILES_URL = "api/profiles/";
export const CREATE_PROFILE_URL = "api/create_profile/";
export const CREATE_RECORD_URL = "api/records/create_record/";
export const RLCS_URL = "api/get_rlcs/";
export const UPLOAD_SIGNING_BASE_URL = "api/storage_up/";
export const RECORD_PERMISSIONS_LIST_URL = "api/records/record_permission_requests/";
export const FORGOT_PASSWORD_URL = "api/forgot_password/";
export const GROUPS_URL = "api/groups/";
export const GROUP_MEMBER_URL = "api/group_member/";
export const PERMISSION_URL = "api/permissions/";
export const HAS_PERMISSION_URL = "api/has_permission/";

const RESET_PASSWORD_URL = "api/reset_password/";
const SPECIAL_RECORD_BASE_URL = "api/records/record/";
const DOWNLOAD_SIGNING_BASE_URL = "api/storage_down/";
const RECORD_DOCUMENT_BASE_URL = "api/records/documents/";


export const GetSpecialProfileURL = (id: string | number) => {
    return `${PROFILES_URL}${id}/`;
};

export const GetRecordsSearchURL = (toSearch: string) => {
    return `${RECORDS_URL}?search=${toSearch}`;
};

export const GetSpecialRecordURL = (id: string | number) => {
    return `${SPECIAL_RECORD_BASE_URL}${id}/`;
};

export const GetDownloadUrl = (file: string) => {
    return `${DOWNLOAD_SIGNING_BASE_URL}?file=${file}`;
};

export const GetUploadUrl = (file: File, fileDirectory: string = '') => {
    return `${UPLOAD_SIGNING_BASE_URL}?file_name=${file.name}&file_type=${file.type}&file_dir=${fileDirectory}`;
};

export const GetCreateRecordDocumentUrl = (record_id: string) => {
    return `${SPECIAL_RECORD_BASE_URL}${record_id}/documents`;
};

export const GetAddRecordMessageUrl = (record_id: string) => {
    return `${SPECIAL_RECORD_BASE_URL}${record_id}/messages`;
};

export const GetRecordDocumentUrl = (document_id: string) => {
    return `${RECORD_DOCUMENT_BASE_URL}${document_id}/`;
};

export const GetRecordpermissionRequestUrl = (record_id: string) => {
    return `${SPECIAL_RECORD_BASE_URL}${record_id}/request_permission`;
};

export const GetResetPasswordUrl = (link_id: string) => {
    return `${RESET_PASSWORD_URL}${link_id}/`;
};

export const GetSpecialGroupURL = (id: string | number) => {
    return `${GROUPS_URL}${id}/`;
};

export const GetSpecialPermissionURL = (id: string | number) => {
    return `${PERMISSION_URL}${id}/`;
};

export const GetSpecialHasPermissionURL = (id: string | number) => {
    return `${HAS_PERMISSION_URL}${id}/`;
};
