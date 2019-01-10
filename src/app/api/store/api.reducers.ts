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

import {FullUser, RestrictedUser} from '../models/user.model';
import {ApiActions, SET_ALL_PERMISSIONS, SET_OTHER_USERS, SET_RLC, SET_USER, SET_USER_PERMISSIONS} from './api.actions';
import {HasPermission, Permission} from '../models/permission.model';
import {RestrictedRlc} from '../models/rlc.model';
import {getIdObjects} from '../../shared/other/reducer-helper';

export interface ApiState {
    user: FullUser;
    other_users: { [id: number]: RestrictedUser },
    all_permissions: { [id: number]: Permission },
    user_permissions: { [id: number]: HasPermission },
    rlc: RestrictedRlc
}

const initialState: ApiState = {
    user: null,
    other_users: {},
    all_permissions: {},
    user_permissions: {},
    rlc: null
};

export function apiReducer(state = initialState, action: ApiActions) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case SET_OTHER_USERS:
            return {
                ...state,
                other_users: getIdObjects(action.payload)
            };
        case SET_ALL_PERMISSIONS:
            return {
                ...state,
                all_permissions: getIdObjects(action.payload)
            };
        case SET_USER_PERMISSIONS:
            return {
                ...state,
                user_permissions: getIdObjects(action.payload)
            };
        case SET_RLC:
            return {
                ...state,
                rlc: action.payload
            };
        default:
            return state;
    }
}
