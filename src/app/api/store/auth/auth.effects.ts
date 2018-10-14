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

import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { from } from "rxjs";
import { Router } from "@angular/router";
import { SET_TOKEN, TRY_SIGNIN, TrySignin } from "./auth.actions";
import { LOGIN_URL } from "../../../statics/api_urls.statics";
import { FullUser } from "../../models/user.model";

@Injectable()
export class AuthEffects {
    constructor(
        private actions: Actions,
        private http: HttpClient,
        private router: Router
    ) {}

    @Effect()
    authSignin = this.actions.pipe(
        ofType(TRY_SIGNIN),
        map((action: TrySignin) => {
            return action.payload;
        }),
        switchMap((authData: { username: string; password: string }) => {
            return from(this.http.post(LOGIN_URL, authData));
        }),
        mergeMap((response: { token: string; user }) => {
            //console.log(response);
            const user = new FullUser(
                response.user.id,
                response.user.email,
                response.user.name,
                new Date(response.user.birthday),
                response.user.phone_number,
                response.user.street,
                response.user.city,
                response.user.postal_code
            );
            localStorage.setItem("token", response.token);
            this.router.navigate([""]);
            return [
                {
                    type: SET_TOKEN,
                    payload: response.token
                }
            ];
        })
    );
}
