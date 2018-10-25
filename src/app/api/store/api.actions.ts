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

import { Action } from "@ngrx/store";
import {FullUser, RestrictedUser} from '../models/user.model';

export const SET_USER = "SET_USER";
export const START_PATCH_USER = "START_PATCH_USER";
export const START_CREATE_USER = "START_CREATE_USER";
export const START_LOADING_OTHER_USERS = "START_LOADING_OTHER_USERS";
export const SET_OTHER_USERS = "SET_OTHER_USERS";

export class SetUser implements Action {
    readonly type = SET_USER;

    constructor(public payload: FullUser) {}
}

export class SetOtherUsers implements Action {
    readonly type = SET_OTHER_USERS;

    constructor(public payload: RestrictedUser[]) {}
}

export class StartPatchUser implements Action {
    readonly type = START_PATCH_USER;

    constructor(public payload: { id: string; userUpdates: any }) {}
}

export class StartCreateUser implements Action {
    readonly type = START_CREATE_USER;

    constructor(public payload: any) {}
}

export class StartLoadingOtherUsers implements Action {
    readonly type = START_LOADING_OTHER_USERS;
}

export type ApiActions =
    | SetUser
    | SetOtherUsers
    | StartPatchUser
    | StartCreateUser
    | StartLoadingOtherUsers;