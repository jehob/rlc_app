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

import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import {
    HasPermission,
    Permission,
    SpecialPermission
} from "../../models/permission.model";
import { ApiSandboxService } from "../../services/api-sandbox.service";
import { ActivatedRoute, Params } from "@angular/router";
import { RestrictedUser } from "../../models/user.model";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { AddHasPermissionComponent } from "../../components/add-has-permission/add-has-permission.component";
import {PERMISSION_CAN_MANAGE_PERMISSIONS_RLC} from '../../../statics/permissions.statics';

@Component({
    selector: "app-edit-permission",
    templateUrl: "./edit-permission.component.html",
    styleUrls: ["./edit-permission.component.scss"]
})
export class EditPermissionComponent implements OnInit, OnDestroy {
    permission: SpecialPermission = null;
    has_permissions: HasPermission[] = [];
    canEditPermissions = false;
    columns = ["id", "has_permission", "permission_for", "remove"];

    allUsers: any;
    allRlcs: any;
    allGroups: any;

    id: string;

    constructor(
        private apiSB: ApiSandboxService,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.apiSB.startLoadingOtherUsers();
        this.apiSB.startLoadingRlcs();
        this.apiSB.startLoadingGroups();

        this.apiSB.getOtherUsers(false).subscribe((users: any) => {
            this.allUsers = users;
        });
        this.apiSB.getGroups(false).subscribe((groups: any) => {
            this.allGroups = groups;
        });
        this.apiSB.getAllRlcs(false).subscribe((rlcs: any) => {
            this.allRlcs = rlcs;
        });


        this.apiSB.hasPermissionFromStringForOwnRlc(PERMISSION_CAN_MANAGE_PERMISSIONS_RLC, hasPermission => {
            this.canEditPermissions = hasPermission;
        });

        this.route.params.subscribe((params: Params) => {
            this.id = params["id"];
            this.apiSB.startLoadingSpecialPermission(this.id);

            this.apiSB
                .getSpecialPermission()
                .subscribe((special_perm: SpecialPermission) => {
                    if (special_perm) {
                        console.log("special permission updated");
                        this.permission = special_perm;
                        this.has_permissions = special_perm.has_permissions.sort((a: HasPermission, b: HasPermission) => {
                            // TODO complex sorting
                            if (a.userHas && !b.userHas || a.groupHas && b.rlcHas)
                                return -1;
                            if (b.userHas && !a.userHas || b.groupHas && a.rlcHas)
                                return 1;

                            return 0;
                        });
                    }
                });
        });
    }

    ngOnDestroy(): void {
        this.apiSB.resetSpecialPermission();
    }

    onRemoveClick(hasPermission: HasPermission): void {
        if (this.canEditPermissions)
            this.apiSB.startRemovingHasPermission(hasPermission.id);
    }

    onAddClick(): void {
        if (this.canEditPermissions)
            this.dialog.open(AddHasPermissionComponent, {
                data: {
                    permissionId: this.id
                }
            });
    }
}
