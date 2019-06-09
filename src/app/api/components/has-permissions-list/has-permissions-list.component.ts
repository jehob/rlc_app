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

import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
} from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import {
    animate,
    animateChild,
    group,
    query,
    state,
    style,
    transition,
    trigger
} from "@angular/animations";
import { Router } from "@angular/router";

import { HasPermission } from "../../models/permission.model";
import { RestrictedUser } from "../../models/user.model";
import { RestrictedGroup } from "../../models/group.model";
import { RestrictedRlc } from "../../models/rlc.model";
import { ApiSandboxService } from "../../services/api-sandbox.service";
import { PERMISSION_CAN_MANAGE_PERMISSIONS_RLC } from "../../../statics/permissions.statics";
import { GetPermissionFrontUrl } from "../../../statics/frontend_links.statics";

@Component({
    selector: "app-has-permissions-list",
    templateUrl: "./has-permissions-list.component.html",
    styleUrls: ["./has-permissions-list.component.scss"]
})
export class HasPermissionsListComponent implements OnInit, OnChanges {
    @Input()
    hasPermissions: HasPermission[];

    permissionNames: {};

    @Input()
    permissionHolder: RestrictedUser | RestrictedGroup | RestrictedRlc;

    columns = ["permission_name", "permission_for", "remove"];

    canEditPermissions = false;
    selection = new SelectionModel<HasPermission>(true, []);

    foldStates = {};
    removeText = "remove";

    constructor(private apiSB: ApiSandboxService, private router: Router) {}

    ngOnInit() {
        if (!this.hasPermissions || this.hasPermissions.length === 0)
            throw new Error(
                "HasPermissionsList-Error: hasPermissions has to be set and .length != 0"
            );

        this.apiSB.hasPermissionFromStringForOwnRlc(
            PERMISSION_CAN_MANAGE_PERMISSIONS_RLC,
            hasPermission => {
                this.canEditPermissions = hasPermission;
            }
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.permissionNames = {};

        let resetStates = false;
        if (this.hasPermissions.length !== Object.keys(this.foldStates).length) {
            this.foldStates = {};
            resetStates = true;
        }
        this.hasPermissions.forEach((hasPermission: HasPermission) => {
            this.permissionNames[
                hasPermission.id
            ] = this.apiSB.getPermissionById(hasPermission.permission_id).name;

            if (resetStates)
                this.foldStates[hasPermission.id] = "folded";
        });
    }

    onRemoveClick(hasPermission: HasPermission): void {
        this.apiSB.startRemovingHasPermission(hasPermission.id);
    }

    onHasPermissionNameClick(hasPermission: HasPermission): void {
        this.router.navigateByUrl(
            GetPermissionFrontUrl(hasPermission.permission_id)
        );
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.hasPermissions.length;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected()
            ? this.selection.clear()
            : this.hasPermissions.forEach(row => this.selection.select(row));
    }

    animationStarted($event) {
        console.log("started", $event);
    }

    onMouseEnter(id: number): void {
        this.foldStates[id] = "unfolded";
    }

    onMouseLeave(id: number): void {
        this.foldStates[id] = "folded";
    }
}
