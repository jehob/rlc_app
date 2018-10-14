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

import { Component, OnInit } from "@angular/core";
import {RecordsSandboxService} from '../../services/records-sandbox.service';
import {Observable, Subscription} from 'rxjs';
import {RecordsState} from '../../store/records.reducers';
import {RestrictedRecord} from '../../models/record.model';

export interface Section {
    id: string;
    type: string;
    status: string;
}

@Component({
    selector: "app-records",
    templateUrl: "./records.component.html",
    styleUrls: ["./records.component.scss"]
})
export class RecordsComponent implements OnInit {
    records: Observable<RestrictedRecord[]>;
    value = "Search...";

    constructor(private recordsSandbox: RecordsSandboxService) {
        this.recordsSandbox.loadRecords();
    }

    ngOnInit() {
        this.records = this.recordsSandbox.getRecords();
    }

}
