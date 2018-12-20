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
import { isDevMode } from '@angular/core';

import { Router } from "@angular/router";
import {
    TRY_RELOAD_STATIC_INFORMATION,
    SET_TOKEN,
    TRY_LOGIN,
    TryLogin
} from "./auth.actions";
import LogRocket from "logrocket";
import { LOGIN_URL } from "../../../statics/api_urls.statics";
import {
    SET_ALL_PERMISSIONS, SET_RLC,
    SET_USER,
    SET_USER_PERMISSIONS
} from '../api.actions';
import { AuthGuardService } from "../../services/auth-guard.service";
import { FullUser } from "../../models/user.model";
import { RecordsSandboxService } from "../../../recordmanagement/services/records-sandbox.service";
import { ApiSandboxService } from "../../services/api-sandbox.service";
import {HasPermission, Permission} from '../../models/permission.model';
import {RestrictedRlc} from '../../models/rlc.model';
import {AppSandboxService} from '../../services/app-sandbox.service';

@Injectable()
export class AuthEffects {
    constructor(
        private actions: Actions,
        private http: HttpClient,
        private router: Router,
        private guard: AuthGuardService,
        private recordSB: RecordsSandboxService,
        private apiSB: ApiSandboxService,
        private appSB: AppSandboxService
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
                    catchError(error => {
                        console.log("error", error);
                        this.apiSB.showErrorSnackBar("Login not successfull");
                        return [];
                    }),
                    mergeMap(
                        (response: {
                            token: string;
                            user: any;
                            all_permissions: any;
                            permissions: any;
                            rlc: any;
                            error: string;
                            error_message: string;
                        }) => {
                            //console.log('successfull login');
                            localStorage.setItem("token", response.token);
                            if (this.guard.lastVisitedUrl)
                                this.router.navigate([
                                    this.guard.getLastVisitedUrl()
                                ]);
                            else this.router.navigate([this.appSB.savedLocation]);
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
        })
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
            return [...AuthEffects.getStaticInformation(response)];
        })
    );

    static getStaticInformation(response: {
        user: any;
        all_permissions: any;
        permissions: any;
        rlc: any;
    }) {
        // not on prod
        if (!isDevMode()){
            // for logging
            LogRocket.identify(response.user.id);
            // keep this console.log
            console.log("identified: ", response.user.id);
        }
        return [
            {
                type: SET_USER,
                payload: FullUser.getFullUserFromJson(response.user)
            },
            {
                type: SET_ALL_PERMISSIONS,
                payload: Permission.getPermissionsFromJsonArray(
                    response.all_permissions
                )
            },
            {
                type: SET_USER_PERMISSIONS,
                payload: HasPermission.getPermissionsFromJsonArray(
                    response.permissions
                )
            },
            {
                type: SET_RLC,
                payload: RestrictedRlc.getRestrictedRlcFromJson(response.rlc)
            }
        ];
    }
}
