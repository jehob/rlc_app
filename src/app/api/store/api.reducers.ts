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
    ApiActions, RESET_SPECIAL_FOREIGN_USER, RESET_SPECIAL_GROUP,
    SET_ALL_PERMISSIONS, SET_GROUPS,
    SET_OTHER_USERS,
    SET_RLC,
    SET_SPECIAL_FOREIGN_USER, SET_SPECIAL_GROUP,
    SET_USER,
    SET_USER_PERMISSIONS,
    SET_USER_RECORD_STATES,
    SET_USER_STATES
} from './api.actions';
import { HasPermission, Permission } from "../models/permission.model";
import { RestrictedRlc } from "../models/rlc.model";
import { getIdObjects } from "../../shared/other/reducer-helper";
import { applySourceSpanToStatementIfNeeded } from "@angular/compiler/src/output/output_ast";
import {FullGroup, RestrictedGroup} from '../models/group.model';

export interface ApiState {
    user: FullUser;
    other_users: { [id: number]: RestrictedUser };
    all_permissions: { [id: number]: Permission };
    user_permissions: { [id: number]: HasPermission };
    groups: { [id: number]: RestrictedGroup };
    group: FullGroup,
    foreign_user: ForeignUser;
    rlc: RestrictedRlc;
    user_states: any;
    user_record_states: any;
}

const initialState: ApiState = {
    user: null,
    other_users: {},
    all_permissions: {},
    user_permissions: {},
    groups: {},
    group: null,
    foreign_user: null,
    rlc: null,
    user_states: [],
    user_record_states: []
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
        case SET_SPECIAL_FOREIGN_USER:
            return {
                ...state,
                foreign_user: action.payload
            };
        case SET_USER_STATES:
            return {
                ...state,
                user_states: action.payload
            };
        case SET_USER_RECORD_STATES:
            return {
                ...state,
                user_record_states: action.payload
            };
        case SET_GROUPS:
            return {
                ...state,
                groups: getIdObjects(action.payload)
            };
        case RESET_SPECIAL_FOREIGN_USER:
            return {
                ...state,
                foreign_user: null
            };
        case SET_SPECIAL_GROUP:
            return {
                ...state,
                group: action.payload
            };
        case RESET_SPECIAL_GROUP:
            return {
                ...state,
                group: null
            };
        default:
            return state;
    }
}
