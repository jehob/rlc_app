/*
 * rlcapp - record and organization management software for refugee law clinics
 * Copyright (C) 2019  Dominik Walser
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

import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { FullRecord } from "../../../models/record.model";
import { RecordsSandboxService } from "../../../services/records-sandbox.service";
import { FullClient } from "../../../models/client.model";
import { OriginCountry } from "../../../models/country.model";
import { FormControl, FormGroup } from "@angular/forms";
import { RecordDocument } from "../../../models/record_document.model";
import { RecordMessage } from "../../../models/record_message.model";
import { Tag } from "../../../models/tag.model";
import { State } from "../../../../api/models/state.model";
import { ApiSandboxService } from "../../../../api/services/api-sandbox.service";
import { dateInPastValidator } from "../../../../statics/validators.statics";
import { alphabeticalSorterByField } from "../../../../shared/other/sorter-helper";
import { tap } from "rxjs/internal/operators/tap";

@Component({
    selector: "app-full-record-detail",
    templateUrl: "./full-record-detail.component.html",
    styleUrls: ["./full-record-detail.component.scss"]
})
export class FullRecordDetailComponent implements OnInit, OnDestroy {
    allCountries: Observable<OriginCountry[]>;
    originCountryError: any;
    givenOriginCountry: OriginCountry;

    allRecordTags: Observable<Tag[]>;
    recordTagErrors: any;

    allRecordStates: Observable<State[]>;
    givenRecordState: State;

    record: FullRecord;
    client: FullClient;
    origin_country: OriginCountry;
    record_documents: RecordDocument[];
    record_messages: RecordMessage[];

    recordEditForm: FormGroup;

    constructor(private recordSB: RecordsSandboxService) {
        this.recordEditForm = new FormGroup({
            client_name: new FormControl(""),
            client_birthday: new FormControl("", [dateInPastValidator]),
            client_phone: new FormControl(""),
            client_note: new FormControl(""),
            note: new FormControl(""),
            official_note: new FormControl(""),
            last_contact_date: new FormControl("", [dateInPastValidator]),
            state: new FormControl(""),
            consultant_team: new FormControl(""),
            lawyer: new FormControl(""),
            related_persons: new FormControl(""),
            contact: new FormControl(""),
            bamf_token: new FormControl(""),
            foreign_token: new FormControl(""),
            first_correspondence: new FormControl(""),
            circumstances: new FormControl(""),
            next_steps: new FormControl(""),
            status_described: new FormControl(""),
            additional_facts: new FormControl("")
        });
    }

    ngOnDestroy() {
        this.recordSB.resetFullClientInformation();
    }

    ngOnInit() {
        this.allCountries = this.recordSB.getOriginCountries();
        this.allRecordTags = this.recordSB.getRecordTags().pipe(
            tap(results => {
                alphabeticalSorterByField(results, "name");
            })
        );
        this.allRecordStates = this.recordSB.getRecordStates();

        // there but not changeable
        // first_contact_date, last_edited, token
        this.recordSB
            .getSpecialRecord()
            .subscribe(
                (special_record: {
                    record: FullRecord;
                    client: FullClient;
                    origin_country: OriginCountry;
                    record_documents: RecordDocument[];
                    record_messages: RecordMessage[];
                }) => {
                    this.record = special_record.record;
                    this.client = special_record.client;

                    this.origin_country = special_record.origin_country;
                    this.record_documents = Object.values(
                        special_record.record_documents
                    );
                    this.record_messages = Object.values(
                        special_record.record_messages
                    );

                    if (this.client && this.record) this.loadValues();
                }
            );
    }

    loadValues() {
        this.recordEditForm.controls["client_name"].setValue(this.client.name);
        this.recordEditForm.controls["client_birthday"].setValue(
            this.client.birthday
        );
        this.recordEditForm.controls["client_phone"].setValue(
            this.client.phone_number
        );
        this.recordEditForm.controls["client_note"].setValue(this.client.note);

        this.recordEditForm.controls["official_note"].setValue(
            this.record.official_note
        );
        this.recordEditForm.controls["state"].setValue(this.record.state);
        this.recordEditForm.controls["note"].setValue(this.record.note);
        this.recordEditForm.controls["contact"].setValue(this.record.contact);
        this.recordEditForm.controls["bamf_token"].setValue(
            this.record.bamf_token
        );
        this.recordEditForm.controls["foreign_token"].setValue(
            this.record.foreign_token
        );
        this.recordEditForm.controls["first_correspondence"].setValue(
            this.record.first_correspondence
        );
        this.recordEditForm.controls["circumstances"].setValue(
            this.record.circumstances
        );
        this.recordEditForm.controls["lawyer"].setValue(this.record.lawyer);
        this.recordEditForm.controls["related_persons"].setValue(
            this.record.related_persons
        );
        this.recordEditForm.controls["consultant_team"].setValue(
            this.record.consultant_team
        );
        this.recordEditForm.controls["last_contact_date"].setValue(
            this.record.last_contact_date
        );
        this.recordEditForm.controls["additional_facts"].setValue(
            this.record.additional_facts
        );
        this.recordEditForm.controls["next_steps"].setValue(
            this.record.next_steps
        );
        this.recordEditForm.controls["status_described"].setValue(
            this.record.status_described
        );

        this.givenOriginCountry = this.recordSB.getOriginCountryById(
            this.client.origin_country
        );
        this.givenRecordState = this.recordSB.getRecordStateByAbbreviation(
            this.record.state
        );
    }

    onSaveClick() {
        this.record.note = this.recordEditForm.value["note"];
        this.record.related_persons = this.recordEditForm.value[
            "related_persons"
        ];
        this.record.contact = this.recordEditForm.value["contact"];
        this.record.last_contact_date = this.convertDate(
            this.recordEditForm.value["last_contact_date"]
        );
        this.record.official_note = this.recordEditForm.value["official_note"];
        this.record.bamf_token = this.recordEditForm.value["bamf_token"];
        this.record.foreign_token = this.recordEditForm.value["foreign_token"];
        this.record.additional_facts = this.recordEditForm.value[
            "additional_facts"
        ];
        this.record.first_correspondence = this.recordEditForm.value[
            "first_correspondence"
        ];
        this.record.circumstances = this.recordEditForm.value["circumstances"];
        this.record.lawyer = this.recordEditForm.value["lawyer"];
        this.record.related_persons = this.recordEditForm.value[
            "related_persons"
        ];
        this.record.consultant_team = this.recordEditForm.value[
            "consultant_team"
        ];
        this.record.next_steps = this.recordEditForm.value["next_steps"];
        this.record.status_described = this.recordEditForm.value[
            "status_described"
        ];

        this.client.note = this.recordEditForm.value["client_note"];
        this.client.name = this.recordEditForm.value["client_name"];
        this.client.birthday = this.convertDate(
            this.recordEditForm.value["client_birthday"]
        );
        this.client.origin_country = this.origin_country.id;
        this.client.phone_number = this.recordEditForm.value["client_phone"];

        this.recordSB.startSavingRecord(this.record, this.client);
    }

    onBackClick() {
        this.recordSB.goBack();
    }

    onSelectedOriginCountryChanged(newOriginCountry: OriginCountry): void {
        this.origin_country = newOriginCountry;
        this.client.origin_country = newOriginCountry.id;
    }

    onSelectedRecordTagsChanged(newTags: Tag[]): void {
        this.record.tags = newTags;
        if (newTags.length === 0) {
            this.recordTagErrors = { null: "true" };
        } else {
            this.recordTagErrors = null;
        }
    }

    onSelectedRecordStateChanged(event: State): void {
        this.record.state = event.abbreviation;
    }

    convertDate(date: string): Date {
        return new Date(ApiSandboxService.transformDateToString(date));
    }

    adjustTextAreaHeight(o) {
        o.style.height = "1px";
        o.style.height = 25 + o.scrollHeight + "px";
    }

    downloadAllRecordDocuments(event){
        event.stopPropagation();
        this.recordSB.downloadAllRecordDocuments();
    }
}
