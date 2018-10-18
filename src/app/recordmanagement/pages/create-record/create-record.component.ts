import { Component, OnInit } from "@angular/core";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RecordsSandboxService} from '../../services/records-sandbox.service';

@Component({
    selector: "app-add-record",
    templateUrl: "./create-record.component.html",
    styleUrls: ["./create-record.component.scss"]
})
export class CreateRecordComponent implements OnInit {
    createRecordForm: FormGroup;

    constructor(private recordSB: RecordsSandboxService) {
        this.createRecordForm = new FormGroup({
            first_contact: new FormControl(''), // TODO: validate not after today
            client_birthday: new FormControl('2018-10-02'), // TODO: validate not after today
        });

        this.onClientBirthdayChanges()
    }

    ngOnInit() {}


    onClientBirthdayChanges() {
        this.createRecordForm.get('client_birthday').valueChanges.subscribe(val => {
            console.log('new val', val);
            this.recordSB.loadClientPossibilities(val);
        });
    }
}
