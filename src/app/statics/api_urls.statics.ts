/*
 * rlcapp - record and organization management software for refugee law clinics
 * Copyright (C) 2018  Dominik Walser
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

const RECORD_SPECIAL_URL = "api/records/record/";
const DOWNLOAD_SIGNING_BASE_URL = "api/storage_down/";

export function GetSpecialProfileURL(id: string | number) {
    return `${PROFILES_URL}${id}/`;
}
export function GetRecordsSearchURL(toSearch: string) {
    return `${RECORDS_URL}?search=${toSearch}`;
}

export function GetSpecialRecordURL(id: string | number) {
    return `${RECORD_SPECIAL_URL}${id}/`;
}

export function GetDownloadUrl(file: string) {
    return `${DOWNLOAD_SIGNING_BASE_URL}?file=${file}`;
}

export function GetUploadUrl(file: File, fileDirectory: string = '') {
    return `${UPLOAD_SIGNING_BASE_URL}?file_name=${file.name}&file_type=${file.type}&file_dir=${fileDirectory}`;
}

export function GetCreateRecordDocumentUrl(record_id: string) {
    return `${RECORD_SPECIAL_URL}${record_id}/documents`;
}
