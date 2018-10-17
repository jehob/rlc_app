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
import { HttpClient } from "@angular/common/http";
import {
    SET_CONSULTANTS,
    SET_ORIGIN_COUNTRIES,
    SET_RECORDS,
    SetRecords,
    START_LOADING_RECORD_STATICS,
    START_LOADING_RECORDS
} from "./records.actions";
import { catchError, mergeMap, switchMap } from "rxjs/operators";
import { from, of } from "rxjs";
import {
    RECORDS_STATICS_URL,
    RECORDS_URL
} from "../../statics/api_urls.statics";
import { FullRecord, RestrictedRecord } from "../models/record.model";
import { load } from "@angular/core/src/render3/instructions";
import { RestrictedUser } from "../../api/models/user.model";
import { OriginCountry } from "../models/country.models";

@Injectable()
export class RecordsEffects {
    constructor(private actions: Actions, private http: HttpClient) {}

    @Effect()
    recordsLoad = this.actions.pipe(
        ofType(START_LOADING_RECORDS),
        switchMap(() => {
            return from(
                this.http.get(RECORDS_URL).pipe(
                    mergeMap(response => {
                        console.log("recordsFromBackend", response);
                        const loadedRecords: Array<RestrictedRecord> = [];
                        Object.values(response).map(record => {
                            if (record.note) {
                                loadedRecords.push(
                                    FullRecord.getFullRecordFromJson(record)
                                );
                            } else {
                                loadedRecords.push(
                                    RestrictedRecord.getRestrictedRecordFromJson(
                                        record
                                    )
                                );
                            }
                        });
                        console.log(loadedRecords);
                        return [{ type: SET_RECORDS, payload: loadedRecords }];
                    }),
                    catchError(error => {
                        return of({ error: "error at loading records" });
                    })
                )
            );
        })
    );

    @Effect()
    recordStaticsLoad = this.actions.pipe(
        ofType(START_LOADING_RECORD_STATICS),
        switchMap(() => {
            return from(
                this.http.get(RECORDS_STATICS_URL).pipe(
                    mergeMap(
                        (response: { consultants: any; countries: any }) => {
                            return [
                                {
                                    type: SET_CONSULTANTS,
                                    payload: RestrictedUser.getRestrictedUsersFromJsonArray(
                                        response.consultants
                                    )
                                },
                                {
                                    type: SET_ORIGIN_COUNTRIES,
                                    payload: OriginCountry.getOriginCountriesFromJsonArray(
                                        response.countries
                                    )
                                }
                            ];
                        }
                    ),
                    catchError(error => {
                        return of({ error: "error at loading record statics" });
                    })
                )
            );
        })
    );
}
