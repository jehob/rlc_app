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
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { from } from "rxjs";
import { Router } from "@angular/router";
import {
    TRY_RELOAD_STATIC_INFORMATION,
    SET_TOKEN,
    TRY_LOGIN,
    TryLogin
} from "./auth.actions";
import { LOGIN_URL } from "../../../statics/api_urls.statics";
import { ApiSandboxService } from "../../services/api-sandbox.service";
import { SET_USER } from "../api.actions";
import { AuthGuardService } from "../../services/auth-guard.service";

@Injectable()
export class AuthEffects {
    constructor(
        private actions: Actions,
        private http: HttpClient,
        private router: Router,
        private guard: AuthGuardService
    ) {}

    @Effect()
    tryLogin = this.actions.pipe(
        ofType(TRY_LOGIN),
        map((action: TryLogin) => {
            return action.payload;
        }),
        switchMap((authData: { username: string; password: string }) => {
            return from(
                this.http.post(LOGIN_URL, authData).pipe(
                    catchError(error => []),
                    mergeMap((response: { token: string; user }) => {
                        localStorage.setItem("token", response.token);

                        if (this.guard.lastVisitedUrl)
                            this.router.navigate([
                                this.guard.getLastVisitedUrl()
                            ]);
                        else this.router.navigate([""]);

                        return [
                            {
                                type: SET_TOKEN,
                                payload: response.token
                            },
                            ...AuthEffects.getStaticInformation(response)
                        ];
                    })
                )
            );
        })
    );

    @Effect()
    reload = this.actions.pipe(
        ofType(TRY_RELOAD_STATIC_INFORMATION),
        switchMap(() => {
            return from(this.http.get(LOGIN_URL));
        }),
        mergeMap((response: any) => {
            console.log(response);

            return [...AuthEffects.getStaticInformation(response)];
        })
    );

    static getStaticInformation(response: { user: any }) {
        return [
            {
                type: SET_USER,
                payload: ApiSandboxService.getFullUserFromJson(response.user)
            }
        ];
    }
}
