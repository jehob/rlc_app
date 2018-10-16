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
import { FullUser } from "../models/user.model";

export const SET_USER = "SET_USER";
export const TRY_PATCH_USER = "TRY_PATCH_USER";
export const TRY_CREATE_USER = "TRY_CREATE_USER";

export class SetUser implements Action {
    readonly type = SET_USER;

    constructor(public payload: FullUser) {}
}

export class PatchUser implements Action {
    readonly type = TRY_PATCH_USER;

    constructor(public payload: {id: string, userUpdates: any}){}
}

export class CreateUser implements Action {
    readonly type = TRY_CREATE_USER;

    constructor(public payload: any){}
}

export type ApiActions = SetUser | PatchUser | CreateUser;
