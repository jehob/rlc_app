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

import { Action } from "@ngrx/store";

export const TRY_LOGIN = "TRY_LOGIN";
export const TRY_RELOAD_STATIC_INFORMATION = "TRY_RELOAD_STATIC_INFORMATION";
export const SET_TOKEN = "SET_TOKEN";
export const LOGOUT = "LOGOUT";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const RESET_PASSWORD = "RESET_PASSWORD";

export class TryLogin implements Action {
    readonly type = TRY_LOGIN;

    constructor(public payload: { username: string; password: string }) {}
}

export class ReloadStaticInformation implements Action {
    readonly type = TRY_RELOAD_STATIC_INFORMATION;
}

export class SetToken implements Action {
    readonly type = SET_TOKEN;

    constructor(public payload: string) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class ForgotPassword implements Action {
    readonly type = FORGOT_PASSWORD;

    constructor(public payload: { email: string }) {}
}

export class ResetPassword implements Action {
    readonly type = RESET_PASSWORD;

    constructor(public payload: { new_password: string, link_id: string }) {}
}

export type AuthActions =
    | TryLogin
    | ReloadStaticInformation
    | SetToken
    | Logout
    | ResetPassword
    | ForgotPassword;
