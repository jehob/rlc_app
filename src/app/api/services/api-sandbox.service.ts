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

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppState } from "../../store/app.reducers";
import { select, Store } from "@ngrx/store";
import {
    Logout,
    ReloadStaticInformation,
    SetToken
} from "../store/auth/auth.actions";
import { ApiState } from "../store/api.reducers";
import { FullUser } from "../models/user.model";
import { take } from "rxjs/operators";
import {CreateUser, PatchUser} from '../store/api.actions';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {DateFormatPipe} from '../pipes/api.pipes';

@Injectable()
export class ApiSandboxService {
    constructor(
        public router: Router,
        private snackBar: MatSnackBar,
        private dateTransformer: DateFormatPipe,
        private appStateStore: Store<AppState>,
        private apiStateStore: Store<ApiState>
    ) {}

    static getFullUserFromJson(user) {
        const userObj = new FullUser(
            user.id,
            user.email,
            user.name,
            new Date(user.birthday),
            user.phone_number,
            user.street,
            user.city,
            user.postal_code
        );
        return userObj;
    }

    logout() {
        localStorage.clear();
        this.appStateStore.dispatch(new Logout());
        this.router.navigate(["login"]);
    }

    startApp() {
        const token = localStorage.getItem("token");
        if (token !== null) {
            this.appStateStore.dispatch(new SetToken(token));
            this.appStateStore.dispatch(new ReloadStaticInformation());
        }

        return this.appStateStore.select("auth");
    }

    getUser() {
        return this.apiStateStore.pipe(select((state: any) => state.api.user));
    }

    patchUser(user: FullUser) {
        let userFromStore: FullUser;
        this.apiStateStore
            .pipe(select((state: any) => state.api.user))
            .pipe(take(1))
            .subscribe((loadedUser: FullUser) => {
                userFromStore = loadedUser;
            });
        const id = userFromStore.id;
        console.log("updates", userFromStore.getUpdates(user, this.dateTransformer));
        this.apiStateStore.dispatch(
            new PatchUser({ id, userUpdates: userFromStore.getUpdates(user, this.dateTransformer) })
        );
    }

    registerUser(user: any){
        this.apiStateStore.dispatch(new CreateUser(user));
    }


    showSuccessSnackBar(message: string) {
        const config = new MatSnackBarConfig();
        config.panelClass = ['snackbar__success'];
        config.duration = 2500;
        config.verticalPosition = "top";
        this.snackBar.open(message, '', config);
    }


}
