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
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { from, of } from "rxjs";

import {
    START_ADMITTING_RECORD_PERMISSION_REQUEST,
    START_REQUESTING_RECORD_PERMISSION,
    START_SAVING_RECORD,
    START_SETTING_RECORD_DOCUMENT_TAGS, StartAdmittingRecordPermissionRequest,
    StartRequestingReadPermission,
    StartSavingRecord,
    StartSettingRecordDocumentTags
} from '../actions/records.actions';
import {
    GetRecordDocumentUrl, GetRecordpermissionRequestUrl,
    GetSpecialRecordURL, RECORD_PERMISSIONS_LIST_URL
} from '../../../statics/api_urls.statics';
import { FullRecord, RestrictedRecord } from "../../models/record.model";
import { Tag } from "../../models/tag.model";
import { FullClient } from "../../models/client.model";
import { AppSandboxService } from "../../../api/services/app-sandbox.service";
import { RecordsSandboxService } from "../../services/records-sandbox.service";
import {RecordPermissionRequest} from '../../models/record_permission.model';

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
    startSettingRecordDocumentTags = this.actions.pipe(
        ofType(START_SETTING_RECORD_DOCUMENT_TAGS),
        map((action: StartSettingRecordDocumentTags) => {
            return action.payload;
        }),
        mergeMap((payload: { tags: Tag[]; document_id: string }) => {
            return from(
                this.http
                    .post(GetRecordDocumentUrl(payload.document_id), {
                        tag_ids: payload.tags
                    })
                    .pipe(
                        catchError(error => {
                            console.log(error);
                            return of({
                                error: "error at adding a record message"
                            });
                        }),
                        mergeMap((response: { error }) => {
                            console.log("response", response);
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
            console.log("effect fired");
            // TODO
            return from(
                this.http.post(GetRecordpermissionRequestUrl(record.id.toString()), {}).pipe(
                //this.http.post(GetRecordpermissionRequestUrl('7172'), {}).pipe(
                    catchError(error => {
                        this.recordSB.showError(error.error.detail);
                        return [];
                    }),
                    mergeMap((response: { error }) => {
                        console.log("response", response);
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
                this.http.post(RECORD_PERMISSIONS_LIST_URL, {
                    id: request.id,
                    action: 'accept'
                }).pipe(
                    catchError(error => {
                        this.recordSB.showError(error.error.detail);
                        return [];
                    }),
                    mergeMap((response: { error }) => {
                        console.log("response", response);
                        const changedRequest = RecordPermissionRequest.getRecordPermissionRequestFromJson(response);
                        return [{

                        }];
                    })
                )
            );
        })
    );
}
