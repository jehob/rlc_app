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
import LogRocket from "logrocket";
import { LOGIN_URL } from "../../../statics/api_urls.statics";
import { SET_USER } from "../api.actions";
import { AuthGuardService } from "../../services/auth-guard.service";
import { FullUser } from "../../models/user.model";
import {RecordsSandboxService} from '../../../recordmanagement/services/records-sandbox.service';

@Injectable()
export class AuthEffects {
    constructor(
        private actions: Actions,
        private http: HttpClient,
        private router: Router,
        private guard: AuthGuardService,
        private recordSB: RecordsSandboxService
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
                    mergeMap(
                        (response: {
                            token: string;
                            user: any;
                            consultants: any;
                            countries: any;
                        }) => {
                            localStorage.setItem("token", response.token);

                            console.log("loginResponse", response);

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
                        }
                    )
                )
            );
        }),
    );

    @Effect()
    setToken = this.actions.pipe(
        ofType(SET_TOKEN),
        switchMap(() => {
            this.recordSB.startLoadingRecordStatics();
            return [];
        })
    );

    @Effect()
    reload = this.actions.pipe(
        ofType(TRY_RELOAD_STATIC_INFORMATION),
        switchMap(() => {
            return from(this.http.get(LOGIN_URL));
        }),
        mergeMap((response: any) => {
            console.log('reloaded', response);
            return [...AuthEffects.getStaticInformation(response)];
        })
    );

    static getStaticInformation(response: { user: any; }) {
        // for logging
        LogRocket.identify(response.user.id);
        // keep this console.log
        console.log("identified: ", response.user.id);

        return  [
            {
                type: SET_USER,
                payload: FullUser.getFullUserFromJson(response.user)
            }
        ];
    }
}
