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

import { Component, Inject, OnInit } from "@angular/core";
import { CoreSandboxService } from "../../services/core-sandbox.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { AddHasPermissionComponent } from "../add-has-permission/add-has-permission.component";
import { Observable } from "rxjs";
import { Permission } from "../../models/permission.model";
import { RestrictedUser } from "../../models/user.model";
import { RestrictedGroup } from "../../models/group.model";
import { RestrictedRlc } from "../../models/rlc.model";
import {tap} from 'rxjs/operators';
import {alphabeticalSorterByField} from '../../../shared/other/sorter-helper';

@Component({
    selector: "app-add-has-permission-for",
    templateUrl: "./add-has-permission-for.component.html",
    styleUrls: ["./add-has-permission-for.component.scss"]
})
export class AddHasPermissionForComponent implements OnInit {
    allPermissions: Observable<Permission[]>;
    selectedPermission: Permission = null;

    allUsers: Observable<RestrictedUser[]>;
    selectedForUser: RestrictedUser = null;

    allGroups: Observable<RestrictedGroup[]>;
    selectedForGroup: RestrictedGroup = null;

    ownRlc: RestrictedRlc;
    forRlcChecked = true;

    constructor(
        private coreSB: CoreSandboxService,
        public dialogRef: MatDialogRef<AddHasPermissionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        this.allUsers = this.coreSB.getOtherUsers().pipe(tap(results => {
            alphabeticalSorterByField(results, 'name')
        }));
        this.allGroups = this.coreSB.getGroups().pipe(tap(results => {
            alphabeticalSorterByField(results, 'name')
        }));
        this.allPermissions = this.coreSB.getAllPermissions();

        this.coreSB.getRlc().subscribe((rlc: RestrictedRlc) => {
            this.ownRlc = rlc;
        });
    }

    onCloseClick(): void {
        this.dialogRef.close();
    }

    onAddClick(): void {
        const group = new RestrictedGroup(this.data.id, this.data.name);
        this.coreSB.startCreatingHasPermission(
            this.selectedPermission.id,
            null,
            group,
            null,
            this.selectedForUser,
            this.selectedForGroup,
            this.forRlcChecked ? this.ownRlc : null
        );
        this.dialogRef.close();
    }

    onSelectedPermissionChanged(selectedPermission: Permission): void {
        this.selectedPermission = selectedPermission;
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

    forRlcChanged(): void {
        this.selectedForUser = null;
        this.selectedForGroup = null;
    }
}
