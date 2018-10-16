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
import {CREATE_USER, CreateUser, PATCH_USER, PatchUser, SET_USER} from './api.actions';
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { from, of } from "rxjs";
import { GetSpecialProfileURL } from "../../statics/api_urls.statics";
import {ApiSandboxService} from '../services/api-sandbox.service';

@Injectable()
export class ApiEffects {
    constructor(private actions: Actions, private http: HttpClient, private apiSB: ApiSandboxService) {}

    @Effect()
    patchUser = this.actions.pipe(
        ofType(PATCH_USER),
        map((action: PatchUser) => {
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
                        catchError((error) => {
                            if (error.status === 400) return of({ error: "1" });
                            else if (error.status === 500)
                                return of({ error: "2" });
                            return of({ error: "unknown" });
                        }),
                        mergeMap((response: any) => {
                            //console.log("yay", response);
                            this.apiSB.showSuccessSnackBar("successfully saved");
                            return [
                                {
                                    type: SET_USER,
                                    payload: ApiSandboxService.getFullUserFromJson(response)
                                }
                            ];
                        })
                    )
            );
        })
    );

    @Effect()
    createUser = this.actions.pipe(
        ofType(CREATE_USER),
        map((action: CreateUser) => {

        })
    );
}
