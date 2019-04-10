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
import { from, of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";

import { AppSandboxService } from "../../../api/services/app-sandbox.service";
import {
    START_LOADING_CLIENT_POSSIBILITIES, START_LOADING_RECORD_PERMISSION_REQUESTS,
    START_LOADING_RECORD_STATICS,
    START_LOADING_RECORDS,
    START_LOADING_SPECIAL_RECORD,
    StartLoadingClientPossibilities, StartLoadingRecordPermissionRequests,
    StartLoadingRecords,
    StartLoadingSpecialRecord
} from '../actions/records-start.actions';
import {
    CLIENTS_BY_BIRTHDAY_API_URL,
    GetRecordsSearchApiURL,
    GetSpecialRecordApiURL, RECORD_PERMISSIONS_LIST_API_URL,
    RECORDS_STATICS_API_URL,
    RECORDS_API_URL
} from '../../../statics/api_urls.statics';
import { FullRecord, RestrictedRecord } from "../../models/record.model";
import {
    SET_CONSULTANTS,
    SET_COUNTRY_STATES,
    SET_ORIGIN_COUNTRIES,
    SET_POSSIBLE_CLIENTS,
    SET_RECORD_DOCUMENT_TAGS, SET_RECORD_PERMISSION_REQUESTS,
    SET_RECORD_STATES,
    SET_RECORD_TAGS,
    SET_RECORDS,
    SET_SPECIAL_CLIENT,
    SET_SPECIAL_ORIGIN_COUNTRY,
    SET_SPECIAL_RECORD,
    SET_SPECIAL_RECORD_DOCUMENTS,
    SET_SPECIAL_RECORD_MESSAGES
} from '../actions/records-set.actions';
import { RestrictedUser } from "../../../api/models/user.model";
import { OriginCountry } from "../../models/country.model";
import { Tag } from "../../models/tag.model";
import { ApiSandboxService } from "../../../api/services/api-sandbox.service";
import { FullClient } from "../../models/client.model";
import { RecordDocument } from "../../models/record_document.model";
import { RecordMessage } from "../../models/record_message.model";
import { RESET_FULL_CLIENT_INFORMATION } from "../actions/records.actions";
import {RecordPermissionRequest} from '../../models/record_permission.model';
import {SnackbarService} from '../../../shared/services/snackbar.service';

@Injectable()
export class RecordsLoadingEffects {
    constructor(
        private actions: Actions,
        private http: HttpClient,
        private appSB: AppSandboxService,
        private snackbarService: SnackbarService
    ) {}

    @Effect()
    startLoadingRecords = this.actions.pipe(
        ofType(START_LOADING_RECORDS),
        map((action: StartLoadingRecords) => {
            return action.payload;
        }),
        switchMap((searchString: string) => {
            const url = searchString
                ? GetRecordsSearchApiURL(searchString)
                : RECORDS_API_URL;
            return from(
                this.http.get(url).pipe(
                    catchError(error => {
                        this.snackbarService.showErrorSnackBar(`error at loading records: ${error.error.detail}`);
                        return [];
                    }),
                    mergeMap(response => {
                        const loadedRecords: Array<RestrictedRecord> = [];
                        Object.values(response).map(record => {
                            if (Object.keys(record).indexOf('note') > -1) {
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
    startLoadingRecordStatics = this.actions.pipe(
        ofType(START_LOADING_RECORD_STATICS),
        switchMap(() => {
            if (this.appSB.isAuthenticated()) {
                return from(
                    this.http.get(RECORDS_STATICS_API_URL).pipe(
                        catchError(error => {
                            this.snackbarService.showErrorSnackBar(`error at loading record statics: ${error.error.detail}`);
                            return [];
                        }),
                        mergeMap(
                            (response: {
                                consultants: any;
                                countries: any;
                                record_tags: any;
                                record_states: any;
                                country_states: any;
                                record_document_tags: any;
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
                                        payload: Tag.getTagsFromJsonArray(
                                            response.record_tags
                                        )
                                    },
                                    {
                                        type: SET_RECORD_DOCUMENT_TAGS,
                                        payload: Tag.getTagsFromJsonArray(
                                            response.record_document_tags
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
    startLoadingClientPossibilities = this.actions.pipe(
        ofType(START_LOADING_CLIENT_POSSIBILITIES),
        map((action: StartLoadingClientPossibilities) => {
            return action.payload;
        }),
        switchMap((birthday: Date) => {
            return from(
                this.http
                    .post(CLIENTS_BY_BIRTHDAY_API_URL, {
                        birthday: ApiSandboxService.transformDate(birthday)
                    })
                    .pipe(
                        catchError(error => {
                            this.snackbarService.showErrorSnackBar(`error at loading client possibilities: ${error.error.detail}`);
                            return [];
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
    startLoadingSpecialRecord = this.actions.pipe(
        ofType(START_LOADING_SPECIAL_RECORD),
        map((action: StartLoadingSpecialRecord) => {
            return action.payload;
        }),
        switchMap((id: string) => {
            return from(
                this.http.get(GetSpecialRecordApiURL(id)).pipe(
                    catchError(error => {
                        this.snackbarService.showErrorSnackBar(`error at loading special record: ${error.error.detail}`);
                        return [];
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

                            const record_messages = RecordMessage.getRecordMessagesFromJsonArray(
                                response.record_messages
                            );
                            arr.push({
                                type: SET_SPECIAL_RECORD_MESSAGES,
                                payload: record_messages
                            });

                            return arr;
                        } else {
                            const record = RestrictedRecord.getRestrictedRecordFromJson(
                                response
                            );
                            return [
                                { type: SET_SPECIAL_RECORD, payload: record },
                                { type: RESET_FULL_CLIENT_INFORMATION }
                            ];
                        }
                    })
                )
            );
        })
    );

    @Effect()
    startLoadingRecordPermissionRequests = this.actions.pipe(
        ofType(START_LOADING_RECORD_PERMISSION_REQUESTS),
        switchMap(() => {
            return from(
                this.http
                    .get(RECORD_PERMISSIONS_LIST_API_URL)
                    .pipe(
                        catchError(error => {
                            console.log(error);
                            this.snackbarService.showErrorSnackBar(`error at loading record permission list: ${error.error.detail}`);
                            return [];
                        }),
                        mergeMap(response => {
                            return [
                                {
                                    type: SET_RECORD_PERMISSION_REQUESTS,
                                    payload: RecordPermissionRequest.getRecordPermissionRequestsFromJsonArray(response)
                                }
                            ];
                        })
                    )
            );
        })
    );
}
