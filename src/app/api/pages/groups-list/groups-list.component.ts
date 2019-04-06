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
import {Observable} from 'rxjs';
import {RestrictedGroup} from '../../models/group.model';
import {Router} from '@angular/router';
import {SnackbarService} from '../../../shared/services/snackbar.service';
import {GetGroupFrontUrl} from '../../../statics/frontend_links.statics';

@Component({
    selector: "app-manage-groups",
    templateUrl: "./groups-list.component.html",
    styleUrls: ["./groups-list.component.scss"]
})
export class GroupsListComponent implements OnInit {
    groups: Observable<RestrictedGroup[]>;

    constructor(private apiSB: ApiSandboxService, private router: Router, private snackbar: SnackbarService) {}

    ngOnInit() {
        this.apiSB.startLoadingGroups();
        this.groups = this.apiSB.getGroups();
    }

    onGroupClick(id: string){
        this.router.navigate([GetGroupFrontUrl(id)]);
    }

    onAddGroupClick(){
        this.snackbar.showErrorSnackBar("not available yet");
    }
}
