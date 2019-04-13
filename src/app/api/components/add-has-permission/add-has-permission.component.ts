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

import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ApiSandboxService } from "../../services/api-sandbox.service";
import { RestrictedUser } from "../../models/user.model";
import { RestrictedGroup } from "../../models/group.model";
import { RestrictedRlc } from "../../models/rlc.model";
import { Observable } from "rxjs";

@Component({
    selector: "app-add-has-permission",
    templateUrl: "./add-has-permission.component.html",
    styleUrls: ["./add-has-permission.component.scss"]
})
export class AddHasPermissionComponent implements OnInit {
    permissionId: string;

    allUsers: Observable<RestrictedUser[]>;
    selectedHasUser: RestrictedUser = null;
    selectedForUser: RestrictedUser = null;

    allGroups: Observable<RestrictedGroup[]>;
    selectedHasGroup: RestrictedGroup = null;
    selectedForGroup: RestrictedGroup = null;

    ownRlc: RestrictedRlc;
    hasRlcChecked = false;
    forRlcChecked = false;

    constructor(
        private apiSB: ApiSandboxService,
        public dialogRef: MatDialogRef<AddHasPermissionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        this.allUsers = this.apiSB.getOtherUsers();
        this.allGroups = this.apiSB.getGroups();

        this.apiSB.getRlc().subscribe((rlc: RestrictedRlc) => {
            this.ownRlc = rlc;
        });

        if (this.data && this.data.permissionId){
            this.permissionId = this.data.permissionId;
        } else {
            this.apiSB.showErrorSnackBar('error: no permission id')
        }
    }

    onAddClick(): void {
        this.apiSB.startCreatingHasPermission(
            this.permissionId,
            this.selectedHasUser,
            this.selectedHasGroup,
            this.hasRlcChecked ? this.ownRlc : null,
            this.selectedForUser,
            this.selectedForGroup,
            this.forRlcChecked ? this.ownRlc : null
        );
        this.dialogRef.close();
    }

    onCloseClick(): void {
        this.dialogRef.close();
    }

    userHasChanged(selectedUser: RestrictedUser): void {
        this.selectedHasUser = selectedUser;
        if (selectedUser) {
            this.selectedHasGroup = null;
            this.hasRlcChecked = false;
        }
    }

    groupHasChanged(selectedGroup: RestrictedGroup): void {
        this.selectedHasGroup = selectedGroup;
        if (selectedGroup) {
            this.selectedHasUser = null;
            this.hasRlcChecked = false;
        }
    }

    userForChanged(selectedUser: RestrictedUser): void {
        this.selectedForUser = selectedUser;
        if (selectedUser) {
            this.selectedForGroup = null;
            this.forRlcChecked = false;
        }
    }

    groupForChanged(selectedGroup: RestrictedGroup): void {
        this.selectedForGroup = selectedGroup;
        if (selectedGroup) {
            this.selectedForUser = null;
            this.forRlcChecked = false;
        }
    }

    hasRlcChanged(): void {
        this.selectedHasUser = null;
        this.selectedHasGroup = null;
    }

    forRlcChanged(): void {
        this.selectedForUser = null;
        this.selectedForGroup = null;
    }
}
