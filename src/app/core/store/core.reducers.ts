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

import { ForeignUser, FullUser, RestrictedUser } from "../models/user.model";
import {
    ADD_GROUP,
    ADD_SINGLE_HAS_PERMISSION,
    CoreActions,
    REMOVE_ACTUAL_HAS_PERMISSIONS, REMOVE_INACTIVE_USER,
    REMOVE_SINGLE_HAS_PERMISSION, RESET_INACTIVE_USERS,
    RESET_SPECIAL_FOREIGN_USER,
    RESET_SPECIAL_GROUP,
    RESET_SPECIAL_PERMISSION,
    SET_ACTUAL_HAS_PERMISSIONS,
    SET_ALL_PERMISSIONS,
    SET_GROUPS, SET_INACTIVE_USERS, SET_NEW_USER_REQUESTS,
    SET_OTHER_USERS,
    SET_RLC,
    SET_RLCS,
    SET_SPECIAL_FOREIGN_USER,
    SET_SPECIAL_GROUP,
    SET_SPECIAL_PERMISSION,
    SET_USER,
    SET_USER_PERMISSIONS,
    SET_USER_RECORD_STATES,
    SET_USER_STATES, UPDATE_NEW_USER_REQUEST
} from './core.actions';
import { HasPermission, Permission } from "../models/permission.model";
import { RestrictedRlc } from "../models/rlc.model";
import {getIdObjects, getObjectsByField} from '../../shared/other/reducer-helper';
import { FullGroup, RestrictedGroup } from "../models/group.model";
import { NewUserRequest } from "../models/new_user_request.model";

export interface CoreState {
    user: FullUser;
    other_users: { [id: number]: RestrictedUser };
    all_permissions: { [id: number]: Permission };
    user_permissions: { [id: number]: HasPermission };
    groups: { [id: number]: RestrictedGroup };
    special_group: FullGroup;
    actual_has_permissions: { [id: number]: HasPermission };
    foreign_user: ForeignUser;
    rlc: RestrictedRlc;
    user_states: any;
    user_record_states: any;
    special_permission: Permission;
    rlcs: { [id: number]: RestrictedRlc };
    new_user_requests: { [id: number]: NewUserRequest };
    inactive_users: { [id: number]: FullUser };
}

const initialState: CoreState = {
    user: null,
    other_users: {},
    all_permissions: {},
    user_permissions: {},
    groups: {},
    special_group: null,
    actual_has_permissions: {},
    foreign_user: null,
    rlc: null,
    user_states: [],
    user_record_states: [],
    special_permission: null,
    rlcs: {},
    new_user_requests: {},
    inactive_users: {}
};

export function coreReducer(state = initialState, action: CoreActions) {
    switch (action.type) {
        case ADD_GROUP:
            return {
                ...state,
                groups: {
                    ...state.groups,
                    [action.payload.id]: action.payload
                }
            };
        case ADD_SINGLE_HAS_PERMISSION:
            const hasPerm: HasPermission = action.payload;
            return {
                ...state,
                actual_has_permissions: {
                    ...state.actual_has_permissions,
                    [hasPerm.id]: hasPerm
                }
            };
        case REMOVE_ACTUAL_HAS_PERMISSIONS:
            return {
                ...state,
                actual_has_permissions: {}
            };
        case REMOVE_SINGLE_HAS_PERMISSION:
            const hasPermissions = state.actual_has_permissions;
            delete hasPermissions[action.payload];

            return {
                ...state,
                actual_has_permissions: hasPermissions
            };
        case REMOVE_INACTIVE_USER:
            const inactive_users = state.inactive_users;
            delete inactive_users[action.payload];

            return {
                ...state,
                inactive_users: inactive_users
            };
        case RESET_INACTIVE_USERS:
            return {
                ...state,
                inactive_users: {}
            };
        case RESET_SPECIAL_FOREIGN_USER:
            return {
                ...state,
                foreign_user: null
            };
        case RESET_SPECIAL_GROUP:
            return {
                ...state,
                special_group: null
            };
        case RESET_SPECIAL_PERMISSION:
            return {
                ...state,
                special_permission: null
            };
        case SET_ACTUAL_HAS_PERMISSIONS:
            return {
                ...state,
                actual_has_permissions: getIdObjects(action.payload)
            };
        case SET_ALL_PERMISSIONS:
            return {
                ...state,
                all_permissions: getIdObjects(action.payload)
            };
        case SET_GROUPS:
            return {
                ...state,
                groups: getIdObjects(action.payload)
            };
        case SET_INACTIVE_USERS:
            return {
                ...state,
                inactive_users: getIdObjects(action.payload)
            };
        case SET_NEW_USER_REQUESTS:
            return {
                ...state,
                new_user_requests: getIdObjects(action.payload)
            };
        case SET_OTHER_USERS:
            return {
                ...state,
                other_users: getIdObjects(action.payload)
            };
        case SET_RLC:
            return {
                ...state,
                rlc: action.payload
            };
        case SET_RLCS:
            return {
                ...state,
                rlcs: getIdObjects(action.payload)
            };
        case SET_SPECIAL_FOREIGN_USER:
            return {
                ...state,
                foreign_user: action.payload
            };
        case SET_SPECIAL_GROUP:
            return {
                ...state,
                special_group: action.payload
            };
        case SET_SPECIAL_PERMISSION:
            return {
                ...state,
                special_permission: action.payload
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case SET_USER_PERMISSIONS:
            return {
                ...state,
                user_permissions: getIdObjects(action.payload)
            };
        case SET_USER_RECORD_STATES:
            return {
                ...state,
                user_record_states: getObjectsByField(action.payload, 'abbreviation')
            };
        case SET_USER_STATES:
            return {
                ...state,
                user_states: getObjectsByField(action.payload, 'abbreviation')
            };
        case UPDATE_NEW_USER_REQUEST:
            return {
                ...state,
                new_user_requests: {
                    ...state.new_user_requests,
                    [action.payload.id]: action.payload
                }
            };
        default:
            return state;
    }
}
