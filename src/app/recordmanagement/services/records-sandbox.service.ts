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
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Location } from "@angular/common";
import { take } from "rxjs/operators";
import { Observable } from "rxjs";
import { RecordsState } from "../store/records.reducers";
import {
    ResetPossibleClients,
    StartAddingNewRecord,
    StartAddingNewRecordDocument,
    StartAddingNewRecordMessage, StartAdmittingRecordPermissionRequest,
    StartLoadingClientPossibilities,
    StartLoadingRecordPermissionRequests,
    StartLoadingRecords,
    StartLoadingRecordStatics,
    StartLoadingSpecialRecord,
    StartRequestingReadPermission,
    StartSavingRecord,
    StartSettingRecordDocumentTags
} from '../store/actions/records.actions';
import { FullClient } from "../models/client.model";
import { OriginCountry } from "../models/country.model";
import { RestrictedUser } from "../../api/models/user.model";
import { Tag } from "../models/tag.model";
import { ApiSandboxService } from "../../api/services/api-sandbox.service";
import { FullRecord, RestrictedRecord } from "../models/record.model";
import { StorageService } from "../../shared/services/storage.service";
import { SnackbarService } from "../../shared/services/snackbar.service";
import { ApiState } from "../../api/store/api.reducers";
import { getRecordFolder } from "../../statics/storage_folders.statics";
import { RecordPermissionRequest } from "../models/record_permission.model";

@Injectable({
    providedIn: "root"
})
export class RecordsSandboxService {
    record_permission_requests: Observable<
        RecordPermissionRequest[]
    > = this.recordStore.pipe(
        select((state: any) => state.records.admin.recod_permission_requests)
    );



    constructor(
        private router: Router,
        private recordStore: Store<RecordsState>,
        private apiStore: Store<ApiState>,
        private apiSB: ApiSandboxService,
        private snackbarService: SnackbarService,
        private storageService: StorageService,
        private location: Location
    ) {}

    loadRecords(searchString?: string) {
        this.recordStore.dispatch(new StartLoadingRecords(searchString));
    }

    getRecords() {
        return this.recordStore.pipe(
            select((state: any) => state.records.records)
        );
    }

    getPossibleClients(): Observable<FullClient[]> {
        return this.recordStore.pipe(
            select((state: any) => state.records.possible_clients)
        );
    }

    getConsultants(): Observable<RestrictedUser[]> {
        return this.recordStore.pipe(
            select((state: any) => state.records.consultants)
        );
    }

    getRecordTags() {
        return this.recordStore.pipe(
            select((state: any) => state.records.record_tags)
        );
    }

    getRecordDocumentTags() {
        return this.recordStore.pipe(
            select((state: any) => state.records.record_document_tags)
        );
    }

    getSpecialPossibleClient(id: string): FullClient {
        let returnClient: FullClient = null;
        this.recordStore
            .pipe(
                take(1),
                select((state: any) =>
                    state.records.possible_clients.find(
                        client => client.id === id
                    )
                )
            )
            .subscribe(state => (returnClient = state));
        return returnClient;
    }

    loadAndGetSpecialRecord(id: string): Observable<any> {
        this.recordStore.dispatch(new StartLoadingSpecialRecord(id));
        return this.recordStore.pipe(
            select((state: any) => state.records.special_record)
        );
    }

    getSpecialRecord(): Observable<any> {
        return this.recordStore.pipe(
            select((state: any) => state.records.special_record)
        );
    }

    getOriginCountryById(id: string): OriginCountry {
        let originCountry: OriginCountry = null;
        this.recordStore
            .pipe(
                take(1),
                select((state: any) =>
                    state.records.origin_countries.find(
                        country => country.id === id
                    )
                )
            )
            .subscribe(country => (originCountry = country));
        return originCountry;
    }

    loadClientPossibilities(birthday: Date) {
        this.recordStore.dispatch(
            new StartLoadingClientPossibilities(birthday)
        );
    }

    startLoadingRecordStatics() {
        this.recordStore.dispatch(new StartLoadingRecordStatics());
    }

    resetPossibleClients() {
        this.recordStore.dispatch(new ResetPossibleClients());
    }

    getOriginCountries(): Observable<OriginCountry[]> {
        return this.recordStore.pipe(
            select((state: any) => state.records.origin_countries)
        );
    }

    createNewRecord(
        createFormValues: any,
        client: FullClient,
        consultants: RestrictedUser[],
        tags: Tag[]
    ) {
        let newRecord = {};
        if (client) {
            newRecord = {
                client_id: client.id
            };
        } else {
            newRecord = {
                client_birthday: ApiSandboxService.transformDate(
                    createFormValues.client_birthday
                ),
                client_name: createFormValues.client_name
            };
        }
        newRecord = {
            ...newRecord,
            client_phone_number: createFormValues.client_phone_number,
            client_note: createFormValues.client_note,
            first_contact_date: ApiSandboxService.transformDate(
                createFormValues.first_contact_date
            ),
            record_token: createFormValues.record_token,
            record_note: createFormValues.record_note,
            consultants: consultants
                ? consultants.map(consultant => consultant.id)
                : "",
            tags: tags ? tags.map(tag => tag.id) : []
        };

        //console.log('new record which will be send to the backend', newRecord);
        this.recordStore.dispatch(new StartAddingNewRecord(newRecord));
    }

    successfullyCreatedRecord(response: any) {
        this.apiSB.showSuccessSnackBar("you successfully created the record");
        this.router.navigate(["records"]);
        // do more
    }

    successfullySavedRecord(response: any) {
        this.apiSB.showSuccessSnackBar("you successfully saved the record");
        // do more
    }

    saveRecord(record: FullRecord, client: FullClient) {
        this.recordStore.dispatch(new StartSavingRecord({ record, client }));
    }

    goBack() {
        this.location.back();
    }

    uploadRecordDocuments(files: File[]) {
        let record_id = null;
        this.recordStore
            .pipe(select((state: any) => state.records.special_record.record))
            .subscribe(record => {
                record_id = record.id;
            });
        let rlc_id = null;
        this.apiStore
            .pipe(select((state: any) => state.api.rlc))
            .subscribe(rlc => {
                rlc_id = rlc.id;
            });
        this.storageService.uploadFiles(
            files,
            getRecordFolder(rlc_id, record_id),
            () => {
                this.snackbarService.showSuccessSnackBar("upload finished");
                for (const file of files) {
                    const information = {
                        record_id,
                        filename: file.name
                    };
                    this.recordStore.dispatch(
                        new StartAddingNewRecordDocument(information)
                    );
                }
            }
        );
    }

    downloadRecordDocument(file_name: string) {
        let record_id = null;
        this.recordStore
            .pipe(select((state: any) => state.records.special_record.record))
            .subscribe(record => {
                record_id = record.id;
            });
        let rlc_id = null;
        this.apiStore
            .pipe(select((state: any) => state.api.rlc))
            .subscribe(rlc => {
                rlc_id = rlc.id;
            });
        this.storageService.downloadFile(
            getRecordFolder(rlc_id, record_id) + "/" + file_name
        );
    }

    startAddingNewRecordMessage(message: string) {
        this.recordStore.dispatch(new StartAddingNewRecordMessage(message));
    }

    showError(error_message: string) {
        this.apiSB.showErrorSnackBar(error_message);
    }

    startSettingDocumentTags(tags: Tag[], document_id: string) {
        this.recordStore.dispatch(
            new StartSettingRecordDocumentTags({ tags, document_id })
        );
    }

    startRequestReadPermission(restrictedRecord: RestrictedRecord) {
        this.recordStore.dispatch(
            new StartRequestingReadPermission(restrictedRecord)
        );
    }

    startLoadingRecordPermissionRequests() {
        this.recordStore.dispatch(new StartLoadingRecordPermissionRequests());
    }

    getRecordPermissionRequests(): Observable<RecordPermissionRequest[]> {
        return this.recordStore.pipe(
            select(
                (state: any) => state.records.admin.record_permission_requests
            )
        );
    }

    admitRecordPermissionRequest(request: RecordPermissionRequest){
        this.recordStore.dispatch(new StartAdmittingRecordPermissionRequest(request));
    }

    declineRecordPermissionRequest(request: RecordPermissionRequest){

    }
}
