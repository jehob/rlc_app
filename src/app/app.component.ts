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

import { Component, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthState } from "./api/store/auth/auth.reducers";
import { Observable } from "rxjs";
import LogRocket from "logrocket";
import { AppSandboxService } from "./api/services/app-sandbox.service";

import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnDestroy{
    @ViewChild('snav')
    snav;

    title = "rlcapp";
    authState: Observable<AuthState>;

    mobileQuery: MediaQueryList;

    private _mobileQueryListener: () => void;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private appSB: AppSandboxService,
        changeDetectorRef: ChangeDetectorRef, 
        media: MediaMatcher
    ) {
        this.authState = this.appSB.startApp();
        LogRocket.init("mndnnu/rlc_app");
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    toggleNav() {
        if (this.snav)
            this.snav.toggle();
    }

    
}
