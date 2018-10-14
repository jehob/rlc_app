import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {select, Store} from '@ngrx/store';
import { RecordsState } from "../store/records.reducers";
import { HttpClient } from "@angular/common/http";
import { RECORDS_URL } from "../../statics/api_urls.statics";
import { FullRecord, RestrictedRecord } from "../models/record.model";
import {SetRecords} from '../store/records.actions';
import {map} from 'rxjs/operators';

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
        this.http.get(RECORDS_URL).subscribe(response => {
            console.log(response);
            const loadedRecords: Array<RestrictedRecord> = [];
            Object.values(response).map(record => {
                if (record.note) {
                    loadedRecords.push(new FullRecord(
                        record.id,
                        new Date(record.last_contact_date),
                        record.state,
                        record.tagged,
                        record.working_on_record,
                        new Date(record.created_on),
                        new Date(record.last_edited),
                        new Date(record.first_contact_date),
                        record.record_token,
                        record.note,
                        record.from_rlc,
                        record.client
                    ));
                } else {
                    loadedRecords.push(
                        new RestrictedRecord(
                            record.id,
                            new Date(record.last_contact_date),
                            record.state,
                            record.tagged,
                            record.working_on_record
                        )
                    );
                }
            });
            console.log(loadedRecords);
            this.store.dispatch(new SetRecords(loadedRecords));
        });
    }

    getRecords(){
        //return this.store.select(state => state.records);
        return this.store.pipe(select((state: any) => state.records.records));
    }
}
