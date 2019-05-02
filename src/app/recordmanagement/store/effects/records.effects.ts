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
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { from, of } from "rxjs";

import {
    START_ADMITTING_RECORD_PERMISSION_REQUEST,
    START_DECLINING_RECORD_PERMISSION_REQUEST,
    START_REQUESTING_RECORD_PERMISSION,
    START_SAVING_RECORD,
    START_SETTING_RECORD_DOCUMENT_TAGS,
    StartAdmittingRecordPermissionRequest,
    StartDecliningRecordPermissionRequest,
    StartRequestingReadPermission,
    StartSavingRecord,
    StartSettingRecordDocumentTags,
    UPDATE_RECORD_PERMISSION_REQUEST
} from "../actions/records.actions";
import {
    GetRecordDocumentApiUrl,
    GetRecordPermissionRequestApiUrl,
    GetSpecialRecordApiURL,
    RECORD_PERMISSIONS_LIST_API_URL
} from "../../../statics/api_urls.statics";
import { FullRecord, RestrictedRecord } from "../../models/record.model";
import { Tag } from "../../models/tag.model";
import { FullClient } from "../../models/client.model";
import { AppSandboxService } from "../../../api/services/app-sandbox.service";
import { RecordsSandboxService } from "../../services/records-sandbox.service";
import { RecordPermissionRequest } from "../../models/record_permission.model";

@Injectable()
export class RecordsEffects {
    constructor(
        private actions: Actions,
        private http: HttpClient,
        private appSB: AppSandboxService,
        private recordSB: RecordsSandboxService
    ) {}

    @Effect()
    startSavingRecord = this.actions.pipe(
        ofType(START_SAVING_RECORD),
        map((action: StartSavingRecord) => {
            return action.payload;
        }),
        switchMap((payload: { record: FullRecord; client: FullClient }) => {
            return from(
                this.http
                    .patch(GetSpecialRecordApiURL(payload.record.id), {
                        record: payload.record,
                        client: payload.client
                    })
                    .pipe(
                        catchError(error => {
                            this.recordSB.showError(
                                `error at saving records: ${error.error.detail}`
                            );
                            return [];
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
    startSettingRecordDocumentTags = this.actions.pipe(
        ofType(START_SETTING_RECORD_DOCUMENT_TAGS),
        map((action: StartSettingRecordDocumentTags) => {
            return action.payload;
        }),
        mergeMap((payload: { tags: Tag[]; document_id: string }) => {
            return from(
                this.http
                    .post(GetRecordDocumentApiUrl(payload.document_id), {
                        tag_ids: payload.tags
                    })
                    .pipe(
                        catchError(error => {
                            this.recordSB.showError(
                                `error at loading records: ${error.error.detail}`
                            );
                            return [];
                        }),
                        mergeMap((response: { error }) => {
                            if (response.error) {
                                this.recordSB.showError("sending error");
                                return [];
                            }
                            return [];
                        })
                    )
            );
        })
    );

    @Effect()
    startRequestingRecordPermission = this.actions.pipe(
        ofType(START_REQUESTING_RECORD_PERMISSION),
        map((action: StartRequestingReadPermission) => {
            return action.payload;
        }),
        mergeMap((record: RestrictedRecord) => {
            return from(
                this.http
                    .post(
                        GetRecordPermissionRequestApiUrl(record.id.toString()),
                        {}
                    )
                    .pipe(
                        catchError(error => {
                            this.recordSB.showError(`error at requesting record permission: ${error.error.detail}`);
                            return [];
                        }),
                        mergeMap((response: { error }) => {
                            if (response.error) {
                                this.recordSB.showError("sending error");
                                return [];
                            }
                            return [];
                        })
                    )
            );
        })
    );

    @Effect()
    startAdmittingRecordPermissionRequest = this.actions.pipe(
        ofType(START_ADMITTING_RECORD_PERMISSION_REQUEST),
        map((action: StartAdmittingRecordPermissionRequest) => {
            return action.payload;
        }),
        mergeMap((request: RecordPermissionRequest) => {
            return from(
                this.http
                    .post(RECORD_PERMISSIONS_LIST_API_URL, {
                        id: request.id,
                        action: "accept"
                    })
                    .pipe(
                        catchError(error => {
                            this.recordSB.showError(`error at admitting record permission request: ${error.error.detail}`);
                            return [];
                        }),
                        mergeMap((response: { error }) => {
                            const changedRequest = RecordPermissionRequest.getRecordPermissionRequestFromJson(
                                response
                            );
                            return [
                                {
                                    type: UPDATE_RECORD_PERMISSION_REQUEST,
                                    payload: changedRequest
                                }
                            ];
                        })
                    )
            );
        })
    );

    @Effect()
    startDecliningRecordPermissionRequest = this.actions.pipe(
        ofType(START_DECLINING_RECORD_PERMISSION_REQUEST),
        map((action: StartDecliningRecordPermissionRequest) => {
            return action.payload;
        }),
        mergeMap((request: RecordPermissionRequest) => {
            return from(
                this.http
                    .post(RECORD_PERMISSIONS_LIST_API_URL, {
                        id: request.id,
                        action: "decline"
                    })
                    .pipe(
                        catchError(error => {
                            this.recordSB.showError(`error at declining record permission request: ${error.error.detail}`);
                            return [];
                        }),
                        mergeMap((response: { error }) => {
                            const changedRequest = RecordPermissionRequest.getRecordPermissionRequestFromJson(
                                response
                            );
                            return [
                                {
                                    type: UPDATE_RECORD_PERMISSION_REQUEST,
                                    payload: changedRequest
                                }
                            ];
                        })
                    )
            );
        })
    );
}
