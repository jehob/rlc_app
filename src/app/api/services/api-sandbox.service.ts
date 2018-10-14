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
import { Store } from "@ngrx/store";
import {Logout, SetToken} from '../store/auth/auth.actions';

@Injectable()
export class ApiSandboxService {
    constructor(private router: Router, private store: Store<AppState>) {}

    logout() {
        localStorage.clear();
        this.store.dispatch(new Logout());
        this.router.navigate(["login"]);
    }

    startApp(){
        const token = localStorage.getItem("token");
        if (token !== null) {
            this.store.dispatch(new SetToken(token));
        }

        return this.store.select("auth");
    }
}
