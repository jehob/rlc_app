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
