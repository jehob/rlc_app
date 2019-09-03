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

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { CoreSandboxService } from "../../services/core-sandbox.service";
import {ForeignUser} from '../../models/user.model';

@Component({
    selector: "app-foreign-profile",
    templateUrl: "./foreign-profile.component.html",
    styleUrls: ["./foreign-profile.component.scss"]
})
export class ForeignProfileComponent implements OnInit, OnDestroy {
    foreignUser: ForeignUser;

    constructor(private coreSB: CoreSandboxService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.coreSB.loadAndGetSpecialForeignUser(params["id"]).subscribe((foreignUser: ForeignUser) => {
                this.foreignUser = foreignUser;
            });
        })
    }

    ngOnDestroy(): void {
        this.coreSB.resetForeignUser();
    }
}
