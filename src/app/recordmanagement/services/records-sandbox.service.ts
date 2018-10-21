import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { RecordsState } from "../store/records.reducers";
import { HttpClient } from "@angular/common/http";
import {
    ResetPossibleClients,
    StartLoadingClientPossibilities,
    StartLoadingRecords,
    StartLoadingRecordStatics
} from '../store/records.actions';
import { take } from "rxjs/operators";
import { FullClient } from "../models/client.model";
import { Observable } from "rxjs";
import { OriginCountry } from "../models/country.model";
import {RestrictedUser} from '../../api/models/user.model';
import {FormControl} from '@angular/forms';
import {RecordTag} from '../models/record_tags.model';

@Injectable({
    providedIn: "root"
})
export class RecordsSandboxService {
    constructor(
        private router: Router,
        private store: Store<RecordsState>
    ) {}

    loadRecords() {
        this.store.dispatch(new StartLoadingRecords());
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

    getRecordTags(){
        return this.store.pipe(
            select((state: any) => state.records.record_tags)
        );
    }

    getSpecialPossibleClient(id: string): FullClient {
        let returnState: FullClient = null;
        this.store
            .pipe(
                take(1),
                select((state: any) =>
                    state.records.possible_clients.find(
                        client => client.id === id
                    )
                )
            )
            .subscribe(state => (returnState = state));
        return returnState;
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

    resetPossibleClients(){
        this.store.dispatch(new ResetPossibleClients());
    }

    getOriginCountries(): Observable<OriginCountry[]>{
        return this.store.pipe(
            select((state: any) => state.records.origin_countries)
        );
    }

    createNewRecord(createFormValues: any, client: FullClient, consultants: RestrictedUser[], tags: RecordTag[]){
        console.log('create new record in sandbox');
        console.log('values', createFormValues);
        console.log('client', client);
        console.log('consultants', consultants);
        console.log('tags', tags);
    }
}
