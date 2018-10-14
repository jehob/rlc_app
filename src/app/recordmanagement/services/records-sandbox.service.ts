import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { RecordsState } from "../store/records.reducers";
import { HttpClient } from "@angular/common/http";
import { StartLoadingRecords } from "../store/records.actions";

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
}
