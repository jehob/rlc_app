import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { RecordsState } from "../store/records.reducers";
import { HttpClient } from "@angular/common/http";
import {RECORDS_URL} from '../../statics/api_urls.statics';

@Injectable({
    providedIn: "root"
})
export class RecordsSandboxService {
    constructor(
        private router: Router,
        private store: Store<RecordsState>,
        private http: HttpClient
    ) {}

    loadRecords(){
        this.http
            .get(RECORDS_URL)
            .subscribe((response) => {
                console.log(response);

            })
    }
}
