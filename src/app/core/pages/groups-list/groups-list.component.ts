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
import { CoreSandboxService } from "../../services/core-sandbox.service";
import { Observable } from "rxjs";
import { RestrictedGroup } from "../../models/group.model";
import { Router } from "@angular/router";
import { GetGroupFrontUrl } from "../../../statics/frontend_links.statics";
import {PERMISSION_CAN_ADD_GROUP_RLC, PERMISSION_CAN_MANAGE_GROUPS_RLC} from '../../../statics/permissions.statics';
import { MatDialog } from "@angular/material";
import {AddGroupComponent} from '../../components/add-group/add-group.component';

@Component({
    selector: "app-manage-groups",
    templateUrl: "./groups-list.component.html",
    styleUrls: ["./groups-list.component.scss"]
})
export class GroupsListComponent implements OnInit {
    groups: Observable<RestrictedGroup[]>;

    canAddGroup = false;

    constructor(
        private coreSB: CoreSandboxService,
        private router: Router,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        this.coreSB.startLoadingGroups();
        this.groups = this.coreSB.getGroups();

        this.coreSB.hasPermissionFromStringForOwnRlc(
            PERMISSION_CAN_MANAGE_GROUPS_RLC,
            hasPermission => {
                if (hasPermission)
                    this.canAddGroup = hasPermission;
            }
        );
        this.coreSB.hasPermissionFromStringForOwnRlc(
            PERMISSION_CAN_ADD_GROUP_RLC,
            hasPermission => {
                if (hasPermission)
                    this.canAddGroup = hasPermission;
            }
        );
    }

    onGroupClick(id: string) {
        this.router.navigate([GetGroupFrontUrl(id)]);
    }

    onAddGroupClick() {
        if (this.canAddGroup) {
            this.dialog.open(AddGroupComponent);
        } else {
            this.coreSB.showErrorSnackBar("no permission to add new group");
        }
    }
}
