/*
 * rlcapp - record and organization management software for refugee law clinics
 * Copyright (C) 2018  Dominik Walser
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

import { Component } from "@angular/core";
import {Router, ActivatedRoute} from '@angular/router';
import { AuthState } from "./api/store/auth/auth.reducers";
import { Observable } from "rxjs";
import LogRocket from 'logrocket';
import {AppSandboxService} from './api/services/app-sandbox.service';

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    title = "rlcapp";
    authState: Observable<AuthState>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private appSB: AppSandboxService
    ) {
        this.authState = this.appSB.startApp();
        LogRocket.init('mndnnu/rlc_app');
    }

    showProfile() {
        this.router.navigate(["profile"], { relativeTo: this.route });
    }

    showRecords() {
        this.router.navigate(["records"], { relativeTo: this.route });
    }

    showSettings() {
        this.router.navigate(["login"]);
    }

    showAddRecord(){
        this.router.navigate(["records/add"])
    }

    logout() {
        this.appSB.logout();
    }
}
