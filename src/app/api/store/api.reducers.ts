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

import {FullUser, RestrictedUser} from '../models/user.model';
import {ApiActions, SET_OTHER_USERS, SET_USER} from './api.actions';

export interface ApiState {
    user: FullUser;
    other_users: RestrictedUser[]
}

const initialState: ApiState = {
    user: null,
    other_users: []
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
                other_users: action.payload
            };
        default:
            return state;
    }
}
