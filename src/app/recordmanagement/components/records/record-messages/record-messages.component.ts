import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RecordsSandboxService} from '../../../services/records-sandbox.service';
import {RecordMessage} from '../../../models/record_message.model';

@Component({
    selector: "app-record-messages",
    templateUrl: "./record-messages.component.html",
    styleUrls: ["./record-messages.component.scss"]
})
export class RecordMessagesComponent implements OnInit {
    messageForm: FormGroup;

    @Input()
    messages: RecordMessage[];

    constructor(private recordSB: RecordsSandboxService) {
        this.messageForm = new FormGroup({
            message: new FormControl("", Validators.required)
        });
    }

    ngOnInit() {}

    onSendClick() {
        this.recordSB.startAddingNewRecordMessage(this.messageForm.value.message);
        this.messageForm.controls['message'].reset();
    }
}
