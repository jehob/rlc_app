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

import { Component, OnDestroy, OnInit } from "@angular/core";
import { HasPermission, Permission } from "../../models/permission.model";
import { CoreSandboxService } from "../../services/core-sandbox.service";
import { ActivatedRoute, Params } from "@angular/router";
import { MatDialog } from "@angular/material";
import { AddHasPermissionComponent } from "../../components/add-has-permission/add-has-permission.component";
import { PERMISSION_CAN_MANAGE_PERMISSIONS_RLC } from "../../../statics/permissions.statics";

@Component({
    selector: "app-edit-permission",
    templateUrl: "./edit-permission.component.html",
    styleUrls: ["./edit-permission.component.scss"]
})
export class EditPermissionComponent implements OnInit, OnDestroy {
    permission: Permission = null;
    has_permissions: HasPermission[] = [];
    canEditPermissions = false;
    columns = ["id", "has_permission", "permission_for", "remove"];

    id: string;

    constructor(
        private coreSB: CoreSandboxService,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.coreSB.startLoadingPermissionStatics();

        this.coreSB.hasPermissionFromStringForOwnRlc(
            PERMISSION_CAN_MANAGE_PERMISSIONS_RLC,
            hasPermission => {
                this.canEditPermissions = hasPermission;
            }
        );

        this.route.params.subscribe((params: Params) => {
            this.id = params["id"];
            this.coreSB.startLoadingSpecialPermission(this.id);

            this.coreSB
                .getSpecialPermission()
                .subscribe((special_perm: Permission) => {
                    this.permission = special_perm;
                });
        });

        this.coreSB
            .getActualHasPermissions()
            .subscribe((actualHasPermissions: HasPermission[]) => {
                this.has_permissions = actualHasPermissions.sort(
                    (a: HasPermission, b: HasPermission) => {
                        // TODO complex sorting
                        if (
                            (a.userHas && !b.userHas) ||
                            (a.groupHas && b.rlcHas)
                        )
                            return -1;
                        if (
                            (b.userHas && !a.userHas) ||
                            (b.groupHas && a.rlcHas)
                        )
                            return 1;

                        return 0;
                    }
                );
            });
    }

    ngOnDestroy(): void {
        this.coreSB.resetSpecialPermission();
    }

    onRemoveClick(hasPermission: HasPermission): void {
        if (this.canEditPermissions)
            this.coreSB.startRemovingHasPermission(hasPermission.id);
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
