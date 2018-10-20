import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { RecordsSandboxService } from "../../services/records-sandbox.service";
import { MatDialog } from "@angular/material";
import { SelectClientDialogComponent } from "../../components/select-client-dialog/select-client-dialog.component";
import { FullClient } from "../../models/client.model";
import { OriginCountry } from "../../models/country.model";
import { RestrictedUser } from "../../../api/models/user.model";

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

    allCountries: OriginCountry[];

    constructor(
        private recordSB: RecordsSandboxService,
        public dialog: MatDialog
    ) {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 20);

        this.createRecordForm = new FormGroup({
            first_contact_date: new FormControl(new Date()),
            client_birthday: new FormControl("2018-10-03"), //date
            client_name: new FormControl(""),
            client_phone_number: new FormControl(""),
            client_origin_country: new FormControl(""),
            client_note: new FormControl(""),
            record_token: new FormControl(""),
            consultants: new FormControl(""),
            tags: new FormControl()
        });

        this.onClientBirthdayChanges();

        this.recordSB.getConsultants().subscribe(consultants => {
            this.allConsultants = consultants;
        });

        this.recordSB.getOriginCountries().subscribe(countries => {
            this.allCountries = countries;
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
                    this.setClientFields();
                } else {
                    this.client = null;
                    this.originCountry = null;
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
        this.createRecordForm.controls["client_origin_country"].setValue(
            this.originCountry.name
        );

        this.createRecordForm.controls["client_name"].disable();
        this.createRecordForm.controls["client_origin_country"].disable();
    }

    resetClientFields() {
        this.createRecordForm.controls["client_name"].setValue("");
        this.createRecordForm.controls["client_phone_number"].setValue("");
        this.createRecordForm.controls["client_note"].setValue("");
        this.createRecordForm.controls["client_origin_country"].setValue("");

        this.createRecordForm.controls["client_name"].enable();
        this.createRecordForm.controls["client_origin_country"].enable();
    }

    onAddRecordClick() {
        console.log("onAddRecordClick");
    }
}
