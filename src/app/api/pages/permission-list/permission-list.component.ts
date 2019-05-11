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
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

import {GetPermissionFrontUrl} from '../../../statics/frontend_links.statics';
import {alphabeticalSorterByField} from '../../../shared/other/sorter-helper';
import {ApiSandboxService} from '../../services/api-sandbox.service';
import {Permission} from '../../models/permission.model';

@Component({
    selector: "app-permission-list",
    templateUrl: "./permission-list.component.html",
    styleUrls: ["./permission-list.component.scss"]
})
export class PermissionListComponent implements OnInit {
    permissions: Observable<Permission[]>;

    constructor(private apiSB: ApiSandboxService, private router: Router) {}

    ngOnInit() {
        this.permissions = this.apiSB.getAllPermissions().pipe(tap(results => {
            alphabeticalSorterByField(results, 'name');
        }));
    }

    onPermissionItemClick(permission: Permission){
        this.router.navigate([GetPermissionFrontUrl(permission)]);
    }
}
