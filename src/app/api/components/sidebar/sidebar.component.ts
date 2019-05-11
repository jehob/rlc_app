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

import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { AppSandboxService } from "../../services/app-sandbox.service";
import { FullUser } from "../../models/user.model";
import { ApiSandboxService } from "../../services/api-sandbox.service";
import {
    PERMISSION_ACCEPT_NEW_USERS_RLC, PERMISSION_ACTIVATE_INACTIVE_USERS, PERMISSION_CAN_ADD_RECORD_RLC,
    PERMISSION_CAN_PERMIT_RECORD_PERMISSION_REQUESTS,
    PERMISSION_CAN_VIEW_PERMISSIONS_RLC,
    PERMISSION_CAN_VIEW_RECORDS
} from '../../../statics/permissions.statics';
import {
    ACCEPT_NEW_USER_REQUESTS_FRONT_URL,
    GROUPS_FRONT_URL, INACTIVE_USERS_FRONT_URL, LEGAL_NOTICE_FRONT_URL,
    OWN_PROFILE_FRONT_URL,
    PERMISSIONS_FRONT_URL,
    PROFILES_FRONT_URL,
    RECORDS_ADD_FRONT_URL,
    RECORDS_FRONT_URL,
    RECORDS_PERMIT_REQUEST_FRONT_URL
} from '../../../statics/frontend_links.statics';

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
    active = false;
    name = "";
    email = "";
    timer = null;
    checkPermissionInterval = 15000;

    recordsUrl = RECORDS_FRONT_URL;
    recordsAddUrl = RECORDS_ADD_FRONT_URL;
    recordsPermitRequestsUrl = RECORDS_PERMIT_REQUEST_FRONT_URL;
    profilesUrl = PROFILES_FRONT_URL;
    groupsUrl = GROUPS_FRONT_URL;
    permissionsUrl = PERMISSIONS_FRONT_URL;
    acceptNewUsersUrl = ACCEPT_NEW_USER_REQUESTS_FRONT_URL;
    inactiveUsersUrl = INACTIVE_USERS_FRONT_URL;

    legalNoticeUrl = LEGAL_NOTICE_FRONT_URL;

    show_record_tab = false;
    show_add_record_tab = false;
    show_record_permission_request_tab = false;
    show_permissions_tab = false;
    show_accept_new_user_requests_tab = false;
    show_inactive_users_tab = false;

    constructor(
        private router: Router,
        private appSB: AppSandboxService,
        private apiSB: ApiSandboxService
    ) {}

    ngOnInit() {
        this.apiSB.hasPermissionFromStringForOwnRlc(
            PERMISSION_CAN_VIEW_RECORDS,
            hasPermission => {
                this.show_record_tab = hasPermission;
            }
        );

        this.apiSB.hasPermissionFromStringForOwnRlc(
            PERMISSION_CAN_ADD_RECORD_RLC,
            hasPermission => {
                this.show_add_record_tab = hasPermission;
            }
        );

        this.apiSB.hasPermissionFromStringForOwnRlc(
            PERMISSION_CAN_PERMIT_RECORD_PERMISSION_REQUESTS,
            hasPermission => {
                this.show_record_permission_request_tab = hasPermission;
            }
        );

        this.apiSB.hasPermissionFromStringForOwnRlc(
            PERMISSION_CAN_VIEW_PERMISSIONS_RLC,
            hasPermission => {
                this.show_permissions_tab = hasPermission;
            }
        );

        this.apiSB.hasPermissionFromStringForOwnRlc(
            PERMISSION_ACCEPT_NEW_USERS_RLC,
            hasPermission => {
                this.show_accept_new_user_requests_tab = hasPermission;
            }
        );

        this.apiSB.hasPermissionFromStringForOwnRlc(
            PERMISSION_ACTIVATE_INACTIVE_USERS,
            hasPermission => {
                this.show_inactive_users_tab = hasPermission;
            }
        );

        this.apiSB.getUser().subscribe((user: FullUser) => {
            this.name = user ? user.name : "";
            this.email = user ? user.email : "";
        });

        this.timer = setInterval(() => {
            this.apiSB.startCheckingUserHasPermissions();
        }, this.checkPermissionInterval)
    }

    logout() {
        clearInterval(this.timer);
        this.appSB.logout();
    }

    showProfile() {
        this.router.navigate([OWN_PROFILE_FRONT_URL]);
    }
}
