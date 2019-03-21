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
import {Permission} from '../../models/permission.model';
import {ApiSandboxService} from '../../services/api-sandbox.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: "app-edit-permission",
    templateUrl: "./edit-permission.component.html",
    styleUrls: ["./edit-permission.component.scss"]
})
export class EditPermissionComponent implements OnInit {
    permission: Permission;
    id: string;

    constructor(private apiSB: ApiSandboxService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
        });
    }
}
