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

import {RestrictedUser} from '../api/models/user.model';
import {RestrictedRecord} from '../recordmanagement/models/record.model';
import {RestrictedGroup} from '../api/models/group.model';
import {Permission} from '../api/models/permission.model';

export const MAIN_PAGE_FRONT_URL = "";
export const REGISTER_FRONT_URL = "register";
export const LOGIN_FRONT_URL = "login";
export const FORGOT_PASSWORD_FRONT_URL = "forgot-password";
export const PROFILES_FRONT_URL = "profiles";
export const OWN_PROFILE_FRONT_URL = "profile";
export const RECORDS_FRONT_URL = "records";
export const RECORDS_ADD_FRONT_URL = "records/add";
export const RECORDS_PERMIT_REQUEST_FRONT_URL = "records/permit_requests";
export const GROUPS_FRONT_URL = "groups";
export const PERMISSIONS_FRONT_URL = "permissions";


export const GetProfileFrontUrl = (profile: RestrictedUser | string): string => {
    if (profile instanceof RestrictedUser)
        return `${PROFILES_FRONT_URL}/${profile.id}`;
    else
        return `${PROFILES_FRONT_URL}/${profile}`;
};

export const GetRecordSearchFrontUrl = (searchTerm: string): string => {
    return `${RECORDS_FRONT_URL}?search=${searchTerm}`;
};

export const GetRecordFrontUrl = (record: RestrictedRecord | string): string => {
    if (record instanceof RestrictedRecord)
        return `${RECORDS_FRONT_URL}/${record.id}`;
    else
        return `${RECORDS_FRONT_URL}/${record}`;
};

export const GetGroupFrontUrl = (group: RestrictedGroup | string): string => {
    if (group instanceof RestrictedGroup)
        return `${GROUPS_FRONT_URL}/${group.id}`;
    else
        return `${GROUPS_FRONT_URL}/${group}`;
};

export const GetPermissionFrontUrl = (permission: Permission | string): string => {
    if (permission instanceof Permission)
        return `${PERMISSIONS_FRONT_URL}/${permission.id}`;
    else
        return `${PERMISSIONS_FRONT_URL}/${permission}`;
};
