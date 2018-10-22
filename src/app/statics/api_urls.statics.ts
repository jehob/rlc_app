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
export const PROFILE_URL = "api/profiles/";
export const CREATE_PROFILE_URL = "api/create_profile/";
export const CREATE_RECORD_URL = "api/records/create_record/";

export function GetSpecialProfileURL(id: string){
    return `${PROFILE_URL}${id}/`;
}
export function GetRecordsSearchURL(toSearch: string){
    return `${RECORDS_URL}?search=${toSearch}`;
}
