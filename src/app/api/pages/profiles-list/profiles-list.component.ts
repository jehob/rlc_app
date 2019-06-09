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
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { tap } from "rxjs/internal/operators/tap";

import { RestrictedUser } from "../../models/user.model";
import { ApiSandboxService } from "../../services/api-sandbox.service";
import { GetProfileFrontUrl } from "../../../statics/frontend_links.statics";
import {alphabeticalSorterByField} from '../../../shared/other/sorter-helper';

@Component({
    selector: "app-profiles-list",
    templateUrl: "./profiles-list.component.html",
    styleUrls: ["./profiles-list.component.scss"]
})
export class ProfilesListComponent implements OnInit {
    otherUsers: Observable<RestrictedUser[]>;

    constructor(private apiSB: ApiSandboxService, private router: Router) {}

    ngOnInit() {
        this.apiSB.startLoadingOtherUsers();

        this.otherUsers = this.apiSB.getOtherUsers().pipe(
            tap(results => {
                alphabeticalSorterByField(results, 'name');
            })
        );
    }

    onUserClick(user: RestrictedUser) {
        this.router.navigateByUrl(GetProfileFrontUrl(user));
    }
}
