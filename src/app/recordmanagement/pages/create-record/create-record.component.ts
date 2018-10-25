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
import {FormControl, FormGroup,  Validators} from '@angular/forms';
import { RecordsSandboxService } from "../../services/records-sandbox.service";
import { MatDialog } from "@angular/material";
import { SelectClientDialogComponent } from "../../components/select-client-dialog/select-client-dialog.component";
import { FullClient } from "../../models/client.model";
import { OriginCountry } from "../../models/country.model";
import { RestrictedUser } from "../../../api/models/user.model";
import { RecordTag } from "../../models/record_tags.model";
import { Observable } from "rxjs";

@Component({
    selector: "app-add-record",
    templateUrl: "./create-record.component.html",
    styleUrls: ["./create-record.component.scss"]
})
export class CreateRecordComponent implements OnInit {
    createRecordForm: FormGroup;
    client: FullClient;
    originCountry: OriginCountry;
    givenOriginCountry: OriginCountry;

    allConsultants: Observable<RestrictedUser[]>;
    consultantErrors: any;
    selectedConsultants: RestrictedUser[];

    allCountries: Observable<OriginCountry[]>;
    originCountryError: any;

    allRecordTags: Observable<RecordTag[]>;
    recordTagErrors: any;
    selectedRecordTags: RecordTag[];

    constructor(
        private recordSB: RecordsSandboxService,
        public dialog: MatDialog
    ) {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 20);

        this.createRecordForm = new FormGroup({
            first_contact_date: new FormControl(new Date()),
            client_birthday: new FormControl("1980-03-27"), //date
            client_name: new FormControl("", [Validators.required]),
            client_phone_number: new FormControl(""),
            client_note: new FormControl(""),
            record_token: new FormControl("", [Validators.required]),
            record_note: new FormControl("")
        });

        this.onClientBirthdayChanges();

        this.allConsultants = this.recordSB.getConsultants();
        this.allCountries = this.recordSB.getOriginCountries();
        this.allRecordTags = this.recordSB.getRecordTags();
    }

    ngOnInit() {}

    onClientBirthdayChanges() {
        this.createRecordForm
            .get("client_birthday")
            .valueChanges.subscribe(val => {
                this.recordSB.loadClientPossibilities(val);

                this.openSelectClientDialog();
            });
    }

    selectedConsultantsChanged(selectedConsultants) {
        this.selectedConsultants = selectedConsultants;
        if (selectedConsultants.length <= 1) {
            this.consultantErrors = { null: "true" };
        } else {
            this.consultantErrors = null;
        }
    }

    selectedCountryChanged(selectedCountry) {
        this.originCountry = selectedCountry;
    }

    selectedRecordTagsChanged(selectedRecordTags) {
        this.selectedRecordTags = selectedRecordTags;
        if (selectedRecordTags.length === 0) {
            this.recordTagErrors = { null: "true" };
        } else {
            this.recordTagErrors = null;
        }
    }

    openSelectClientDialog() {
        const dialogRef = this.dialog.open(SelectClientDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (result !== -1) {
                    this.client = this.recordSB.getSpecialPossibleClient(
                        result
                    );
                    this.originCountry = this.recordSB.getOriginCountryById(
                        this.client.origin_country
                    );
                    this.givenOriginCountry = this.originCountry;
                    this.setClientFields();
                } else {
                    this.client = null;
                    this.originCountry = null;
                    this.givenOriginCountry = null;
                    this.resetClientFields();
                }
            }
            this.recordSB.resetPossibleClients();
        });
    }

    setClientFields() {
        this.createRecordForm.controls["client_name"].setValue(
            this.client.name
        );
        this.createRecordForm.controls["client_phone_number"].setValue(
            this.client.phone_number
        );

        this.createRecordForm.controls["client_note"].setValue(
            this.client.note
        );

        this.createRecordForm.controls["client_name"].disable();
    }

    resetClientFields() {
        this.createRecordForm.controls["client_name"].setValue("");
        this.createRecordForm.controls["client_phone_number"].setValue("");
        this.createRecordForm.controls["client_note"].setValue("");

        this.createRecordForm.controls["client_name"].enable();
    }

    onAddRecordClick() {
        // console.log("onAddRecordClick");
        // console.log(this.selectedConsultants);
        let invalid = false;
        if (!this.selectedRecordTags || this.selectedRecordTags.length < 1) {
            this.recordTagErrors = { null: "true" };
            invalid = true;
        }
        if (!this.selectedConsultants || this.selectedConsultants.length < 2) {
            this.consultantErrors = { null: "true" };
            invalid = true;
        }

        if (!invalid) {
            this.recordSB.createNewRecord(
                this.createRecordForm.value,
                this.client,
                this.selectedConsultants,
                this.selectedRecordTags
            );
        }
    }
}