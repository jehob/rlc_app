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
import { Router } from "@angular/router";
import { AppSandboxService } from "../../services/app-sandbox.service";
import { FullUser } from "../../models/user.model";
import { ApiSandboxService } from "../../services/api-sandbox.service";
import {PERMISSION_CAN_PERMIT_RECORD_PERMISSION_REQUESTS, PERMISSION_CAN_VIEW_RECORDS} from '../../../statics/permissions.statics';

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
    active = false;
    name = "";
    email = "";

    record_enabled = false;
    can_permit_requests = false;

    constructor(
        private router: Router,
        private appSB: AppSandboxService,
        private apiSB: ApiSandboxService
    ) {}

    ngOnInit() {
        this.apiSB.getUser().subscribe((user: FullUser) => {
            this.name = user ? user.name : "";
            this.email = user ? user.email : "";
        });

        this.apiSB.hasPermissionFromString(PERMISSION_CAN_VIEW_RECORDS, has_permission => {
            this.record_enabled = has_permission;
        });
        this.apiSB.hasPermissionFromString(PERMISSION_CAN_PERMIT_RECORD_PERMISSION_REQUESTS, has_permission => {
            this.can_permit_requests = has_permission;
        });
    }

    logout() {
        this.appSB.logout();
    }

    showProfile() {
        this.router.navigate(["profile"]);
    }
}
