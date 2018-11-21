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
    ADD_RECORD_DOCUMENT,
    RecordsActions,
    SET_CONSULTANTS,
    SET_COUNTRY_STATES,
    SET_ORIGIN_COUNTRIES,
    SET_POSSIBLE_CLIENTS,
    SET_RECORD_STATES,
    SET_RECORD_TAGS,
    SET_RECORDS,
    SET_SPECIAL_CLIENT,
    SET_SPECIAL_ORIGIN_COUNTRY,
    SET_SPECIAL_RECORD,
    SET_SPECIAL_RECORD_DOCUMENTS,
    START_ADDING_NEW_RECORD,
    START_ADDING_NEW_RECORD_DOCUMENT,
    START_LOADING_CLIENT_POSSIBILITIES,
    START_LOADING_RECORD_STATICS,
    START_LOADING_RECORDS,
    START_LOADING_SPECIAL_RECORD,
    START_SAVING_RECORD,
    StartAddingNewRecord,
    StartAddingNewRecordDocument,
    StartLoadingClientPossibilities,
    StartLoadingRecords,
    StartLoadingSpecialRecord,
    StartSavingRecord
} from "./records.actions";
import {
    catchError,
    concatMap,
    map,
    mergeMap,
    switchMap,
    switchMapTo
} from "rxjs/operators";
import { from, merge, of } from "rxjs";
import {
    CLIENTS_BY_BIRTHDAY_URL,
    CREATE_RECORD_URL,
    GetCreateRecordDocumentUrl,
    GetRecordsSearchURL,
    GetSpecialRecordURL,
    RECORDS_STATICS_URL,
    RECORDS_URL
} from "../../statics/api_urls.statics";
import { FullRecord, RestrictedRecord } from "../models/record.model";
import { RestrictedUser } from "../../api/models/user.model";
import { OriginCountry } from "../models/country.model";
import { RecordTag } from "../models/record_tags.model";
import { ApiSandboxService } from "../../api/services/api-sandbox.service";
import { FullClient } from "../models/client.model";
import { AppSandboxService } from "../../api/services/app-sandbox.service";
import { RecordsSandboxService } from "../services/records-sandbox.service";
import { RecordDocument } from "../models/record_documents.model";

@Injectable()
export class RecordsEffects {
    constructor(
        private actions: Actions,
        private http: HttpClient,
        private appSB: AppSandboxService,
        private recordSB: RecordsSandboxService
    ) {}

    @Effect()
    recordsLoad = this.actions.pipe(
        ofType(START_LOADING_RECORDS),
        map((action: StartLoadingRecords) => {
            return action.payload;
        }),
        switchMap((searchString: string) => {
            const url = searchString
                ? GetRecordsSearchURL(searchString)
                : RECORDS_URL;
            return from(
                this.http.get(url).pipe(
                    catchError(error => {
                        return of({ error: "error at loading records" });
                    }),
                    mergeMap(response => {
                        //console.log("recordsFromBackend", response);
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
                        return [{ type: SET_RECORDS, payload: loadedRecords }];
                    })
                )
            );
        })
    );

    @Effect()
    recordStaticsLoad = this.actions.pipe(
        ofType(START_LOADING_RECORD_STATICS),
        switchMap(() => {
            if (this.appSB.isAuthenticated()) {
                return from(
                    this.http.get(RECORDS_STATICS_URL).pipe(
                        catchError(error => {
                            return of({
                                error: "error at loading record statics"
                            });
                        }),
                        mergeMap(
                            (response: {
                                consultants: any;
                                countries: any;
                                record_tags: any;
                                record_states: any;
                                country_states: any;
                            }) => {
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
                                    },
                                    {
                                        type: SET_RECORD_TAGS,
                                        payload: RecordTag.getRecordTagsFromJsonArray(
                                            response.record_tags
                                        )
                                    },
                                    {
                                        type: SET_RECORD_STATES,
                                        payload: response.record_states
                                    },
                                    {
                                        type: SET_COUNTRY_STATES,
                                        payload: response.country_states
                                    }
                                ];
                            }
                        )
                    )
                );
            }
            return [];
        })
    );

    @Effect()
    loadingClientPossibilities = this.actions.pipe(
        ofType(START_LOADING_CLIENT_POSSIBILITIES),
        map((action: StartLoadingClientPossibilities) => {
            return action.payload;
        }),
        switchMap((birthday: Date) => {
            return from(
                this.http
                    .post(CLIENTS_BY_BIRTHDAY_URL, {
                        birthday: ApiSandboxService.transformDate(birthday)
                    })
                    .pipe(
                        catchError(error => {
                            return of({
                                error: "error at loading client possibilities"
                            });
                        }),
                        mergeMap(response => {
                            const clients = FullClient.getFullClientsFromJsonArray(
                                response
                            );
                            return [
                                { type: SET_POSSIBLE_CLIENTS, payload: clients }
                            ];
                        })
                    )
            );
        })
    );

    @Effect()
    addingNewRecord = this.actions.pipe(
        ofType(START_ADDING_NEW_RECORD),
        map((action: StartAddingNewRecord) => {
            return action.payload;
        }),
        switchMap((newRecord: any) => {
            return from(
                this.http.post(CREATE_RECORD_URL, newRecord).pipe(
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
    loadingSpecialRecord = this.actions.pipe(
        ofType(START_LOADING_SPECIAL_RECORD),
        map((action: StartLoadingSpecialRecord) => {
            return action.payload;
        }),
        switchMap((id: string) => {
            return from(
                this.http.get(GetSpecialRecordURL(id)).pipe(
                    catchError(error => {
                        return of({ error: "error at loading special record" });
                    }),
                    mergeMap((response: any) => {
                        if (response.record) {
                            const arr = [];
                            const record: FullRecord = FullRecord.getFullRecordFromJson(
                                response.record
                            );
                            arr.push({
                                type: SET_SPECIAL_RECORD,
                                payload: record
                            });

                            const client: FullClient = FullClient.getFullClientFromJson(
                                response.client
                            );
                            arr.push({
                                type: SET_SPECIAL_CLIENT,
                                payload: client
                            });

                            const originCountry: OriginCountry = OriginCountry.getOriginCountryFromJson(
                                response.origin_country
                            );
                            arr.push({
                                type: SET_SPECIAL_ORIGIN_COUNTRY,
                                payload: originCountry
                            });

                            const record_documents = RecordDocument.getRecordDocumentsFromJsonArray(
                                response.record_documents
                            );
                            arr.push({
                                type: SET_SPECIAL_RECORD_DOCUMENTS,
                                payload: record_documents
                            });

                            return arr;
                        } else {
                            const record = RestrictedRecord.getRestrictedRecordFromJson(
                                response
                            );
                            return [
                                { type: SET_SPECIAL_RECORD, payload: record }
                            ];
                        }
                    })
                )
            );
        })
    );

    @Effect()
    savingRecord = this.actions.pipe(
        ofType(START_SAVING_RECORD),
        map((action: StartSavingRecord) => {
            return action.payload;
        }),
        switchMap((payload: { record: FullRecord; client: FullClient }) => {
            return from(
                this.http
                    .patch(GetSpecialRecordURL(payload.record.id), {
                        record_note: payload.record.note
                    })
                    .pipe(
                        catchError(error => {
                            return of({
                                error: "error at loading special record"
                            });
                        }),
                        mergeMap((response: any) => {
                            this.recordSB.successfullySavedRecord(response);
                            return [];
                        })
                    )
            );
        })
    );

    @Effect()
    addingNewRecordDocument = this.actions.pipe(
        ofType(START_ADDING_NEW_RECORD_DOCUMENT),
        map((action: StartAddingNewRecordDocument) => {
            return action.payload;
        }),
        mergeMap((newDocument: any) => {
            console.log("addingnewrecord");
            return from(
                this.http
                    .post(
                        GetCreateRecordDocumentUrl(newDocument.record_id),
                        newDocument
                    )
                    .pipe(
                        catchError(error => {
                            console.log("error");
                            return of({
                                'error': "error at creating a record document"
                            });
                        }),
                        mergeMap(response => {
                            console.log("got something");
                            console.log("addingNewRecordDocument", response);
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
}
