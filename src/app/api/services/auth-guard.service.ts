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
import { Store } from "@ngrx/store";
import { map, take } from "rxjs/operators";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from "@angular/router";
import { AppState } from "../../store/app.reducers";
import { AuthService } from "./auth.service";
import { AuthState } from "../store/auth/auth.reducers";

@Injectable()
export class AuthGuardService implements CanActivate {
    lastVisitedUrl: string = undefined;

    constructor(
        private auth: AuthService,
        private router: Router,
        private store: Store<AppState>
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select("auth").pipe(
            take(1),
            map((authState: AuthState) => {
                if (!authState.authenticated) {
                    this.lastVisitedUrl = route.routeConfig.path;
                    this.router.navigate(["login"]);
                }
                return authState.authenticated;
            })
        );
    }

    getLastVisitedUrl(){
        let returnVal;
        if (this.lastVisitedUrl)
            returnVal = this.lastVisitedUrl;
        this.lastVisitedUrl = undefined;
        return returnVal;
    }
}
