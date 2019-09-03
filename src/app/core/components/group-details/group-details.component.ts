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

import { Component, Input, OnInit } from "@angular/core";
import { CoreSandboxService } from "../../services/core-sandbox.service";
import { FullGroup } from "../../models/group.model";
import { AddGroupMemberComponent } from "../add-group-member/add-group-member.component";
import { MatDialog } from "@angular/material";
import {Router} from '@angular/router';
import {GetProfileFrontUrl} from '../../../statics/frontend_links.statics';
import {RestrictedUser} from '../../models/user.model';

@Component({
    selector: "app-group-details",
    templateUrl: "./group-details.component.html",
    styleUrls: ["./group-details.component.scss"]
})
export class GroupDetailsComponent implements OnInit {
    memberColumns = [];

    @Input()
    editGroupMembers: boolean;

    @Input()
    group: FullGroup;

    constructor(private coreSB: CoreSandboxService, public dialog: MatDialog, private router: Router) {}

    ngOnInit() {
        this.editGroupMembers = (this.editGroupMembers !== undefined);

        if (this.editGroupMembers) {
            this.memberColumns = ["member", "remove"];
        } else {
            this.memberColumns = ["member"];
        }
    }

    onRemoveGroupMemberClick(user_id: string) {
        this.coreSB.removeGroupMember(user_id, this.group.id);
    }

    onAddGroupMemberClick() {
        this.dialog.open(AddGroupMemberComponent);
    }

    onUserClick(user: RestrictedUser){
        this.router.navigateByUrl(GetProfileFrontUrl(user));
    }
}
