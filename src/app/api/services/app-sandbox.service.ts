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

import { Injectable } from "@angular/core";
import { AppState } from "../../store/app.reducers";
import { select, Store } from "@ngrx/store";
import { take } from "rxjs/operators";
import {
    ForgotPassword,
    Logout,
    ReloadStaticInformation, ResetPassword,
    SetToken,
    TryLogin
} from '../store/auth/auth.actions';
import { Router } from "@angular/router";
import { RecordsSandboxService } from "../../recordmanagement/services/records-sandbox.service";
import {Observable} from 'rxjs';
import {AuthState} from '../store/auth/auth.reducers';
import {LOGIN_FRONT_URL} from '../../statics/frontend_links.statics';

@Injectable()
export class AppSandboxService {
    savedLocation = '';

    constructor(
        private store: Store<AppState>,
        private router: Router
    ) {}

    isAuthenticated(): boolean {
        let isAuthenticated = false;
        this.store
            .pipe(
                take(1),
                select((state: any) => state.auth.authenticated)
            )
            .subscribe(authenticated => (isAuthenticated = authenticated));
        return isAuthenticated;
    }

    logout() {
        localStorage.clear();
        this.store.dispatch(new Logout());
        this.router.navigate([LOGIN_FRONT_URL]);
    }

    login(username: string, password: string) {
        this.store.dispatch(new TryLogin({ username, password }));

    }

    startApp(): Observable<AuthState> {
        const token = localStorage.getItem("token");
        if (token !== null) {
            this.store.dispatch(new SetToken(token));
            this.store.dispatch(new ReloadStaticInformation());
        }
        return this.store.pipe(select("auth"));
    }

    getAuthState(): Observable<AuthState> {
        return this.store.pipe(select("auth"));
    }
    saveLocation(){
        this.savedLocation = this.router.url;
    }

    forgotPassword(email: string): void {
        this.store.dispatch(new ForgotPassword({email}));
    }

    resetPassword(new_password: string, link_id: string): void {
        this.store.dispatch(new ResetPassword({new_password, link_id}));
    }


}
