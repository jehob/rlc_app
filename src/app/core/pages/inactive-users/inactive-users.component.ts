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
import {CoreSandboxService} from '../../services/core-sandbox.service';
import {Observable} from 'rxjs';
import {FullUser} from '../../models/user.model';

@Component({
    selector: "app-inactive-users",
    templateUrl: "./inactive-users.component.html",
    styleUrls: ["./inactive-users.component.scss"]
})
export class InactiveUsersComponent implements OnInit {
    inactive_users: Observable<FullUser[]>;

    columns = [
        'name',
        'email',
        'activate'
    ];

    constructor(private coreSB: CoreSandboxService) {}

    ngOnInit() {
        this.coreSB.startLoadingInactiveUsers();
        this.inactive_users = this.coreSB.getInactiveUsers();
    }

    onActivateUser(user: FullUser): void {
        this.coreSB.startActivatingInactiveUser(user);
    }
}
