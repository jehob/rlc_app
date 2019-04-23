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
import { MatDialogRef } from "@angular/material";
import { ApiSandboxService } from "../../services/api-sandbox.service";
import { FullGroup } from "../../models/group.model";
import { RestrictedUser } from "../../models/user.model";
import {alphabeticalSorterByField} from '../../../shared/other/sorter-helper';

@Component({
    selector: "app-add-group-member",
    templateUrl: "./add-group-member.component.html",
    styleUrls: ["./add-group-member.component.scss"]
})
export class AddGroupMemberComponent implements OnInit {
    group_members: RestrictedUser[];
    other_users: RestrictedUser[];
    users_to_show: RestrictedUser[];
    group_id: string;

    constructor(
        public dialogRef: MatDialogRef<AddGroupMemberComponent>,
        private apiSB: ApiSandboxService
    ) {}

    ngOnInit() {
        this.apiSB.startLoadingOtherUsers();
        this.apiSB
            .getOtherUsers()
            .subscribe((other_users: RestrictedUser[]) => {
                alphabeticalSorterByField(other_users, 'name');
                this.other_users = other_users;
                this.checkUsersToShow();
            });
        this.apiSB.getGroup().subscribe((group: FullGroup) => {
            if (group) {
                this.group_members = group.members;
                this.group_id = group.id;

                this.checkUsersToShow();
            }
        });
    }

    onCloseClick() {
        this.dialogRef.close();
    }

    onAddGroupMemberClick(user: RestrictedUser) {
        this.apiSB.addGroupMember(user.id, this.group_id);
    }

    checkUsersToShow() {
        if (this.group_members && this.other_users){
            this.users_to_show = [];
            this.other_users.forEach((other_user: RestrictedUser) => {
                if (
                    this.group_members &&
                    this.group_members.filter(
                        (group_member: RestrictedUser) =>
                            group_member.id === other_user.id
                    ).length === 0
                ) {
                    this.users_to_show.push(other_user);
                }
            });
        }
    }
}
