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
import {PatchUser, SET_USER} from '../store/api.actions';
import {load} from '@angular/core/src/render3/instructions';

@Injectable()
export class ApiSandboxService {
    constructor(
        private router: Router,
        private appStateStore: Store<AppState>,
        private apiStateStore: Store<ApiState>
    ) {}

    static getFullUserFromJson(user){
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
        return [
            {
                type: SET_USER,
                payload: userObj
            }
        ];
    };

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

    saveUser(user: FullUser) {
        let userFromStore: FullUser;
        this.apiStateStore
            .pipe(select((state: any) => state.api.user))
            .pipe(take(1))
            .subscribe((loadedUser: FullUser) => {
                userFromStore = loadedUser;
            });
        const id = userFromStore.id;
        console.log('updates', userFromStore.getUpdates(user));
        this.apiStateStore.dispatch(new PatchUser({id, userUpdates: userFromStore.getUpdates(user)}));
    }
}
