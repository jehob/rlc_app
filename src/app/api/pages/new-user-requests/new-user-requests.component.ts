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

import { Component, OnInit } from "@angular/core";
import {ApiSandboxService} from '../../services/api-sandbox.service';
import {NewUserRequest} from '../../models/new_user_request.model';
import {Observable} from 'rxjs';

@Component({
    selector: "app-new-user-requests",
    templateUrl: "./new-user-requests.component.html",
    styleUrls: ["./new-user-requests.component.scss"]
})
export class NewUserRequestsComponent implements OnInit {
    newUserRequests: Observable<NewUserRequest[]>;
    processedColumns = ['id', 'from', 'processor', 'processed_date', 'state'];

    constructor(private apiSB: ApiSandboxService) {}

    ngOnInit() {
        this.apiSB.startLoadingNewUserRequests();
        this.newUserRequests = this.apiSB.getNewUserRequests();
    }

    onAcceptClick(event, request: NewUserRequest): void {
        event.stopPropagation();
        this.apiSB.startAdmittingNewUserRequest(request);
    }

    onDeclineClick(event, request: NewUserRequest): void {
        event.stopPropagation();
        this.apiSB.startDecliningNewUserRequest(request);
    }
}
