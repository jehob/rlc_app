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

import { Component, Input, OnInit } from "@angular/core";
import { RecordMessage } from "../../../../models/record_message.model";
import {ApiSandboxService} from '../../../../../api/services/api-sandbox.service';
import {FullUser} from '../../../../../api/models/user.model';

@Component({
    selector: "app-record-message-item",
    templateUrl: "./record-message-item.component.html",
    styleUrls: ["./record-message-item.component.scss"]
})
export class RecordMessageItemComponent implements OnInit {
    @Input()
    message: RecordMessage;

    ownMessage: boolean;

    constructor(private apiSB: ApiSandboxService) {}

    ngOnInit() {
        let own = null;
        this.apiSB.getUser().subscribe((user: FullUser) => {
            own = user.id;
        }).unsubscribe();

        if (own === this.message.sender.id){
            this.ownMessage = true;
        } else {
            this.ownMessage = false;
        }
    }
}
