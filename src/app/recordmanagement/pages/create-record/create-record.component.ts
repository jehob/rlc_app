import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { RecordsSandboxService } from "../../services/records-sandbox.service";
import {
    MatAutocomplete,
    MatAutocompleteSelectedEvent,
    MatChipInputEvent,
    MatDialog
} from "@angular/material";
import { SelectClientDialogComponent } from "../../components/select-client-dialog/select-client-dialog.component";
import { map, startWith } from "rxjs/operators";
import { FullClient } from "../../models/client.model";
import { OriginCountry } from "../../models/country.model";
import { RestrictedUser } from "../../../api/models/user.model";
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

    allConsultants: RestrictedUser[];
    consultantErrors: any;
    selectedConsultants: RestrictedUser[];

    constructor(
        private recordSB: RecordsSandboxService,
        public dialog: MatDialog
    ) {
        this.createRecordForm = new FormGroup({
            first_contact: new FormControl(""), // TODO: validate not after today
            client_birthday: new FormControl("2018-10-03"), // TODO: validate not after today
            client_name: new FormControl(""),
            client_phone_number: new FormControl(""),
            client_origin_country: new FormControl(""),
            record_token: new FormControl(""),
            consultants: new FormControl(""),
            tags: new FormControl()
        });

        this.onClientBirthdayChanges();

        this.recordSB.getConsultants().subscribe(consultants => {
            this.allConsultants = consultants;
        });
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
        if (selectedConsultants.length === 0) {
            this.consultantErrors = { null: "true" };
        } else {
            this.consultantErrors = null;
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
                    //console.log('client', this.client);
                    //console.log('originCountry', this.originCountry);

                    this.createRecordForm.controls["client_name"].setValue(
                        this.client.name
                    );
                    this.createRecordForm.controls[
                        "client_phone_number"
                    ].setValue(this.client.phone_number);
                    this.createRecordForm.controls[
                        "client_origin_country"
                    ].setValue(this.originCountry.name);
                    this.createRecordForm.controls[
                        "client_origin_country"
                    ].disable();
                } else {
                    this.client = null;
                    this.originCountry = null;
                }
            }
            this.recordSB.resetPossibleClients();
        });
    }
}
