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
import { ApiSandboxService } from "../../services/api-sandbox.service";
import { ActivatedRoute, Params } from "@angular/router";
import {
    PERMISSION_CAN_MANAGE_GROUP,
    PERMISSION_CAN_MANAGE_GROUPS_RLC
} from "../../../statics/permissions.statics";
import { RestrictedRlc } from "../../models/rlc.model";

@Component({
    selector: "app-group",
    templateUrl: "./group.component.html",
    styleUrls: ["./group.component.scss"]
})
export class GroupComponent implements OnInit {
    id: string;
    can_edit = false;

    constructor(
        private apiSB: ApiSandboxService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params["id"];
            this.apiSB.startLoadingSpecialGroup(this.id);
        });
        this.apiSB.hasPermissionFromStringForOwnRlc(
            PERMISSION_CAN_MANAGE_GROUPS_RLC,
            permission => {
                if (permission) this.can_edit = true;
            }
        );
        this.apiSB.hasPermissionFromStringForOwnRlc(
            PERMISSION_CAN_MANAGE_GROUP,
            permission => {
                if (permission) this.can_edit = true;
            }
        );
    }
}
