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
import { RecordsState } from "../store/records.reducers";
import {
    ResetPossibleClients,
    StartAddingNewRecord,
    StartLoadingClientPossibilities,
    StartLoadingRecords,
    StartLoadingRecordStatics,
    StartLoadingSpecialRecord,
    StartSavingRecord
} from "../store/records.actions";
import { take } from "rxjs/operators";
import { FullClient } from "../models/client.model";
import { Observable } from "rxjs";
import { OriginCountry } from "../models/country.model";
import { RestrictedUser } from "../../api/models/user.model";
import { RecordTag } from "../models/record_tags.model";
import { ApiSandboxService } from "../../api/services/api-sandbox.service";
import { FullRecord } from "../models/record.model";
import {Location} from '@angular/common'
import {StorageService} from '../../shared/services/storage.service';
@Injectable({
    providedIn: "root"
})
export class RecordsSandboxService {
    constructor(
        private router: Router,
        private store: Store<RecordsState>,
        private apiSB: ApiSandboxService,
        private storageService: StorageService,
        private location: Location
    ) {}

    loadRecords(searchString?: string) {
        this.store.dispatch(new StartLoadingRecords(searchString));
    }

    getRecords() {
        return this.store.pipe(select((state: any) => state.records.records));
    }

    getPossibleClients(): Observable<FullClient[]> {
        return this.store.pipe(
            select((state: any) => state.records.possible_clients)
        );
    }

    getConsultants(): Observable<RestrictedUser[]> {
        return this.store.pipe(
            select((state: any) => state.records.consultants)
        );
    }

    getRecordTags() {
        return this.store.pipe(
            select((state: any) => state.records.record_tags)
        );
    }

    getSpecialPossibleClient(id: string): FullClient {
        let returnClient: FullClient = null;
        this.store
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
        this.store.dispatch(new StartLoadingSpecialRecord(id));
        return this.store.pipe(
            select((state: any) => state.records.special_record)
        );
    }

    getSpecialRecord(): Observable<any> {
        return this.store.pipe(
            select((state: any) => state.records.special_record)
        );
    }

    getOriginCountryById(id: string): OriginCountry {
        let originCountry: OriginCountry = null;
        this.store
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
        this.store.dispatch(new StartLoadingClientPossibilities(birthday));
    }

    startLoadingRecordStatics() {
        this.store.dispatch(new StartLoadingRecordStatics());
    }

    resetPossibleClients() {
        this.store.dispatch(new ResetPossibleClients());
    }

    getOriginCountries(): Observable<OriginCountry[]> {
        return this.store.pipe(
            select((state: any) => state.records.origin_countries)
        );
    }

    createNewRecord(
        createFormValues: any,
        client: FullClient,
        consultants: RestrictedUser[],
        tags: RecordTag[]
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
        this.store.dispatch(new StartAddingNewRecord(newRecord));
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
        this.store.dispatch(new StartSavingRecord({ record, client }));
    }

    goBack() {
        this.location.back();
    }

    uploadRecordDocuments(files: File[]){
        this.storageService.uploadFiles(files, 'a');
    }
}
