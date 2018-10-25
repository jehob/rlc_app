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
import { HttpClient } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
    START_CREATE_USER,
    StartCreateUser,
    START_PATCH_USER,
    StartPatchUser,
    SET_USER,
    START_LOADING_OTHER_USERS,
    SET_OTHER_USERS
} from "./api.actions";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { from, of } from "rxjs";
import {
    CREATE_PROFILE_URL,
    GetSpecialProfileURL,
    PROFILES_URL
} from "../../statics/api_urls.statics";
import { ApiSandboxService } from "../services/api-sandbox.service";
import { FullUser, RestrictedUser } from "../models/user.model";

@Injectable()
export class ApiEffects {
    constructor(
        private actions: Actions,
        private http: HttpClient,
        private apiSB: ApiSandboxService
    ) {}

    @Effect()
    patchUser = this.actions.pipe(
        ofType(START_PATCH_USER),
        map((action: StartPatchUser) => {
            //console.log("getPayload", action.payload);
            return action.payload;
        }),
        switchMap((updates: { id: string; userUpdates: any }) => {
            //console.log("userUpdates", updates.userUpdates);
            return from(
                this.http
                    .patch(
                        GetSpecialProfileURL(updates.id),
                        updates.userUpdates
                    )
                    .pipe(
                        catchError(error => {
                            if (error.status === 400) return of({ error: "1" });
                            else if (error.status === 500)
                                return of({ error: "2" });
                            return of({ error: "unknown" });
                        }),
                        mergeMap((response: any) => {
                            //console.log("yay", response);
                            this.apiSB.showSuccessSnackBar(
                                "successfully saved"
                            );
                            return [
                                {
                                    type: SET_USER,
                                    payload: FullUser.getFullUserFromJson(
                                        response
                                    )
                                }
                            ];
                        })
                    )
            );
        })
    );

    @Effect()
    createUser = this.actions.pipe(
        ofType(START_CREATE_USER),
        map((action: StartCreateUser) => {
            return action.payload;
        }),
        switchMap((user: any) => {
            console.log('user to backend', user);
            return from(
                this.http.post(CREATE_PROFILE_URL, user).pipe(
                    catchError(error => {
                        console.log(error);
                        return of({ error: "error" });
                    }),
                    mergeMap((response: any) => {
                        if (!response.error) {
                            this.apiSB.showSuccessSnackBar(
                                "successfully created account"
                            );
                            this.apiSB.router.navigate(["login"]);
                        }
                        return [];
                    })
                )
            );
        })
    );

    @Effect()
    getProfiles = this.actions.pipe(
        ofType(START_LOADING_OTHER_USERS),
        switchMap(() => {
            return from(
                this.http.get(PROFILES_URL).pipe(
                    catchError(error => {
                        console.log(error);
                        return of({ error: "error" });
                    }),
                    mergeMap((response: any) => {
                        //console.log(response);
                        const users = RestrictedUser.getRestrictedUsersFromJsonArray(
                            response
                        );
                        return [{ type: SET_OTHER_USERS, payload: users }];
                    })
                )
            );
        })
    );
}