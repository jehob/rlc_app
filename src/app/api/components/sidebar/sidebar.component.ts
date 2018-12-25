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
