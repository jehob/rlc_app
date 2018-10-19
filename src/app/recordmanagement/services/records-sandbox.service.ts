import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { RecordsState } from "../store/records.reducers";
import { HttpClient } from "@angular/common/http";
import {
    StartLoadingClientPossibilities,
    StartLoadingRecords
} from "../store/records.actions";
import { take } from "rxjs/operators";
import { FullClient } from "../models/client.model";
import { Observable } from "rxjs";
import { OriginCountry } from "../models/country.model";

@Injectable({
    providedIn: "root"
})
export class RecordsSandboxService {
    constructor(
        private router: Router,
        private store: Store<RecordsState>,
        private http: HttpClient
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

    getSpecialPossibleClient(id: string): FullClient {
        let returnState: FullClient;
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
        let originCountry: OriginCountry;
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
}
