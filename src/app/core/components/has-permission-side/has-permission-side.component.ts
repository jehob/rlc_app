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
import { HasPermission } from "../../models/permission.model";
import { CoreSandboxService } from "../../services/core-sandbox.service";
import { RestrictedUser } from "../../models/user.model";
import { Router } from "@angular/router";
import {RestrictedGroup} from '../../models/group.model';
import {GetGroupFrontUrl, GetProfileFrontUrl} from '../../../statics/frontend_links.statics';

@Component({
    selector: "app-has-permission-side",
    templateUrl: "./has-permission-side.component.html",
    styleUrls: ["./has-permission-side.component.scss"]
})
export class HasPermissionSideComponent implements OnInit {
    @Input()
    hasPermission: HasPermission;

    @Input()
    whichSide: string;

    name: string;

    constructor(private coreSB: CoreSandboxService, private router: Router) {}

    ngOnInit() {
        if (!this.hasPermission)
            throw new Error("HasPermissionSide-Error: no haspermission given");
        if (
            !this.whichSide ||
            (this.whichSide !== "has" && this.whichSide !== "for")
        )
            throw new Error(
                'HasPermissionSide-Error: whichSide has to be set and equals "has" or "for"'
            );

        if (this.whichSide === "has") {
            if (this.hasPermission.userHas) {
                this.name = this.coreSB.getOtherUserById(
                    this.hasPermission.userHas
                ).name;
            } else if (this.hasPermission.groupHas) {
                this.name = this.coreSB.getGroupById(
                    this.hasPermission.groupHas
                ).name;
            }
        } else if (this.whichSide === "for") {
            if (this.hasPermission.forUser) {
                this.name = this.coreSB.getOtherUserById(
                    this.hasPermission.forUser
                ).name;
            } else if (this.hasPermission.forGroup) {
                this.name = this.coreSB.getGroupById(
                    this.hasPermission.forGroup
                ).name;
            }
        }
    }

    onUserClick(): void {
        if (this.whichSide === 'for')
            this.router.navigateByUrl(GetProfileFrontUrl(this.hasPermission.forUser));
        else
            this.router.navigateByUrl(GetProfileFrontUrl(this.hasPermission.userHas));
    }

    onGroupClick(): void {
        if (this.whichSide === 'for')
            this.router.navigateByUrl(GetGroupFrontUrl(this.hasPermission.forGroup));
        else
            this.router.navigateByUrl(GetGroupFrontUrl(this.hasPermission.groupHas));
    }
}
