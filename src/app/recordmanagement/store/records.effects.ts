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
    SET_RECORDS,
    SetRecords,
    TRY_LOADING_RECORDS
} from "./records.actions";
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import { RECORDS_URL } from "../../statics/api_urls.statics";
import { FullRecord, RestrictedRecord } from "../models/record.model";
import { load } from "@angular/core/src/render3/instructions";

@Injectable()
export class RecordsEffects {
    constructor(private actions: Actions, private http: HttpClient) {}

    @Effect()
    recordsLoad = this.actions.pipe(
        ofType(TRY_LOADING_RECORDS),
        switchMap(() => {
            return from(
                this.http.get(RECORDS_URL).pipe(
                    mergeMap(response => {
                        console.log('recordsFromBackend', response);
                        const loadedRecords: Array<RestrictedRecord> = [];
                        Object.values(response).map(record => {
                            if (record.note) {
                                loadedRecords.push(
                                    new FullRecord(
                                        record.id,
                                        record.record_token,
                                        new Date(record.last_contact_date),
                                        record.state,
                                        record.tagged,
                                        record.working_on_record,
                                        new Date(record.created_on),
                                        new Date(record.last_edited),
                                        new Date(record.first_contact_date),
                                        record.record_token,
                                        record.note,
                                        record.from_rlc,
                                        record.client
                                    )
                                );
                            } else {
                                loadedRecords.push(
                                    new RestrictedRecord(
                                        record.id,
                                        record.record_token,
                                        new Date(record.last_contact_date),
                                        record.state,
                                        record.tagged,
                                        record.working_on_record
                                    )
                                );
                            }
                        });
                        console.log(loadedRecords);
                        return [{ type: SET_RECORDS, payload: loadedRecords }];
                    }),
                    catchError(error => {
                        return of({'error': 'error at loading '})
                    })
                )
            );
        })
    );
}
