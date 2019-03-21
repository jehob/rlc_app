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
import { FullGroup } from "../../models/group.model";
import { ApiSandboxService } from "../../services/api-sandbox.service";
import {MatDialog} from '@angular/material';
import {AddGroupMemberComponent} from '../add-group-member/add-group-member.component';

@Component({
    selector: "app-edit-group",
    templateUrl: "./edit-group.component.html",
    styleUrls: ["./edit-group.component.scss"]
})
export class EditGroupComponent implements OnInit {
    group: FullGroup;

    constructor(private apiSB: ApiSandboxService, public dialog: MatDialog) {}

    ngOnInit() {
        this.apiSB.getGroup().subscribe((group: FullGroup) => {
            this.group = group;
        });
    }

    onAddGroupMemberClick() {
        this.dialog.open(AddGroupMemberComponent);
    }

    onRemoveGroupMemberClick(user_id: string){
        this.apiSB.removeGroupMember(user_id, this.group.id);
    }
}
