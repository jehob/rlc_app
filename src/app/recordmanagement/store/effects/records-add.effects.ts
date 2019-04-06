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

import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { select, Store } from "@ngrx/store";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { from, of } from "rxjs";

import { AppSandboxService } from "../../../api/services/app-sandbox.service";
import { RecordsSandboxService } from "../../services/records-sandbox.service";
import { RecordState } from "../../models/states.model";
import {
    START_ADDING_NEW_RECORD,
    START_ADDING_NEW_RECORD_DOCUMENT,
    START_ADDING_NEW_RECORD_MESSAGE,
    StartAddingNewRecord,
    StartAddingNewRecordDocument,
    StartAddingNewRecordMessage
} from "../actions/records-start.actions";
import {
    CREATE_RECORD_API_URL,
    GetAddRecordMessageUrl,
    GetCreateRecordDocumentUrl
} from "../../../statics/api_urls.statics";
import { RecordDocument } from "../../models/record_document.model";
import {
    ADD_RECORD_DOCUMENT,
    ADD_RECORD_MESSAGE
} from "../actions/records.actions";
import { RecordMessage } from "../../models/record_message.model";

@Injectable()
export class RecordsAddEffects {
    constructor(
        private actions: Actions,
        private http: HttpClient,
        private appSB: AppSandboxService,
        private recordSB: RecordsSandboxService,
        private recordStore: Store<RecordState>
    ) {}

    @Effect()
    startAddingNewRecord = this.actions.pipe(
        ofType(START_ADDING_NEW_RECORD),
        map((action: StartAddingNewRecord) => {
            return action.payload;
        }),
        switchMap((newRecord: any) => {
            return from(
                this.http.post(CREATE_RECORD_API_URL, newRecord).pipe(
                    catchError(error => {
                        return of({ error: "error at creating new record" });
                    }),
                    mergeMap(response => {
                        this.recordSB.successfullyCreatedRecord(response);
                        return [];
                    })
                )
            );
        })
    );

    @Effect()
    startAddingNewRecordDocument = this.actions.pipe(
        ofType(START_ADDING_NEW_RECORD_DOCUMENT),
        map((action: StartAddingNewRecordDocument) => {
            return action.payload;
        }),
        mergeMap((newDocument: any) => {
            return from(
                this.http
                    .post(
                        GetCreateRecordDocumentUrl(newDocument.record_id),
                        newDocument
                    )
                    .pipe(
                        catchError(error => {
                            console.log(error);
                            return of({
                                error: "error at creating a record document"
                            });
                        }),
                        mergeMap(response => {
                            const document = RecordDocument.getRecordDocumentFromJson(
                                response
                            );
                            return [
                                {
                                    type: ADD_RECORD_DOCUMENT,
                                    payload: document
                                }
                            ];
                        })
                    )
            );
        })
    );

    @Effect()
    startAddingNewRecordMessage = this.actions.pipe(
        ofType(START_ADDING_NEW_RECORD_MESSAGE),
        map((action: StartAddingNewRecordMessage) => {
            return action.payload;
        }),
        mergeMap((newMessage: any) => {
            let record_id = null;
            this.recordStore
                .pipe(
                    select((state: any) => state.records.special_record.record)
                )
                .subscribe(record => {
                    record_id = record.id;
                })
                .unsubscribe();
            return from(
                this.http
                    .post(GetAddRecordMessageUrl(record_id), {
                        message: newMessage
                    })
                    .pipe(
                        catchError(error => {
                            console.log(error);
                            return of({
                                error: "error at adding a record message"
                            });
                        }),
                        mergeMap((response: { error }) => {
                            if (response.error) {
                                this.recordSB.showError("sending error");
                                return [];
                            }

                            const new_message = RecordMessage.getRecordMessageFromJson(
                                response
                            );
                            return [
                                {
                                    type: ADD_RECORD_MESSAGE,
                                    payload: new_message
                                }
                            ];
                        })
                    )
            );
        })
    );
}
