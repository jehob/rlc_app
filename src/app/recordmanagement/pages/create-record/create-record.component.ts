import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RecordsSandboxService } from "../../services/records-sandbox.service";
import { MatDialog } from "@angular/material";
import { SelectClientDialogComponent } from "../../components/select-client-dialog/select-client-dialog.component";
import { map, take } from "rxjs/operators";
import { FullClient } from "../../models/client.model";
import {OriginCountry} from '../../models/country.model';

@Component({
    selector: "app-add-record",
    templateUrl: "./create-record.component.html",
    styleUrls: ["./create-record.component.scss"]
})
export class CreateRecordComponent implements OnInit {
    createRecordForm: FormGroup;
    client: FullClient;
    originCountry: OriginCountry;

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
            client: new FormGroup({
                name: new FormControl('')
            })
        });

        this.onClientBirthdayChanges();
    }

    ngOnInit() {}

    onClientBirthdayChanges() {
        this.createRecordForm
            .get("client_birthday")
            .valueChanges.subscribe(val => {
                console.log("new val", val);
                this.recordSB.loadClientPossibilities(val);

                this.openSelectClientDialog();
            });
    }

    openSelectClientDialog() {
        const dialogRef = this.dialog.open(SelectClientDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            console.log("closedDialog", result);
            if (result) {
                console.log("i got something");
                if (result !== -1) {
                    this.client = this.recordSB.getSpecialPossibleClient(
                        result
                    );
                    this.originCountry = this.recordSB.getOriginCountryById(this.client.origin_country);
                    console.log('client', this.client);
                    console.log('originCountry', this.originCountry);

                    this.createRecordForm.controls["client_name"].setValue(
                        this.client.name
                    );
                    this.createRecordForm.controls["client_phone_number"].setValue(
                        this.client.phone_number
                    );
                    this.createRecordForm.controls["client_origin_country"].setValue(
                        this.recordSB.getOriginCountryById(this.originCountry.name)
                    );

                }
            }
        });
    }
}
