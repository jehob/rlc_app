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
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { RecordsSandboxService } from "../../services/records-sandbox.service";
import { RecordPermissionRequest } from "../../models/record_permission.model";
import { RestrictedUser } from "../../../core/models/user.model";
import {GetProfileFrontUrl, GetRecordFrontUrl} from '../../../statics/frontend_links.statics';

@Component({
    selector: "app-records-permit-requests",
    templateUrl: "./records-permit-requests.component.html",
    styleUrls: ["./records-permit-requests.component.scss"]
})
export class RecordsPermitRequestsComponent implements OnInit {
    recordPermissionRequests: Observable<RecordPermissionRequest[]>;

    constructor(
        private recordSB: RecordsSandboxService,
        private router: Router
    ) {}

    toProcessColumns = [
        "request_from",
        "record",
        "requested",
        "state",
        "accept"
    ];
    alreadyProcessedColumns = [
        "request_from",
        "record",
        "requested",
        "state",
        "processor",
        "processed_on"
    ];

    ngOnInit() {
        this.recordSB.startLoadingRecordPermissionRequests();
        this.recordPermissionRequests = this.recordSB.getRecordPermissionRequests();
    }

    permitRequest(request: RecordPermissionRequest) {
        this.recordSB.admitRecordPermissionRequest(request);
    }

    declineRequest(request: RecordPermissionRequest) {
        this.recordSB.declineRecordPermissionRequest(request);
    }

    onRequestClick(request: RecordPermissionRequest) {
        this.router.navigateByUrl(GetRecordFrontUrl(request.record));
    }

    onUserClick(user: RestrictedUser) {
        this.router.navigateByUrl(GetProfileFrontUrl(user));
    }
}
