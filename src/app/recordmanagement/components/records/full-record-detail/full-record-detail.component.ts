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
import { FullRecord } from "../../../models/record.model";
import { RecordsSandboxService } from "../../../services/records-sandbox.service";
import { FullClient } from "../../../models/client.model";
import { OriginCountry } from "../../../models/country.model";
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: "app-full-record-detail",
    templateUrl: "./full-record-detail.component.html",
    styleUrls: ["./full-record-detail.component.scss"]
})
export class FullRecordDetailComponent implements OnInit {
    record: FullRecord;
    client: FullClient;
    origin_country: OriginCountry;
    recordEditForm: FormGroup;

    constructor(private recordSB: RecordsSandboxService) {
        this.recordEditForm = new FormGroup({
            note: new FormControl('')
        })
    }

    ngOnInit() {
        this.recordSB
            .getSpecialRecord()
            .subscribe(
                (special_record: {
                    record: FullRecord;
                    client: FullClient;
                    origin_country: OriginCountry;
                }) => {
                    this.record = special_record.record;
                    this.client = special_record.client;
                    this.origin_country = special_record.origin_country;
                    //console.log(this.origin_country.name);

                    this.recordEditForm.controls['note'].setValue(this.record.note);
                }
            );
    }

    onSaveClick(){
        //console.log(this.recordEditForm.value['note']);
        this.record.note = this.recordEditForm.value['note'];
        this.recordSB.saveRecord(this.record, this.client);
    }
}
