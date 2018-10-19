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
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LOGIN_URL } from "../../statics/api_urls.statics";
import {AppState} from '../../store/app.reducers';
import {Store} from '@ngrx/store';

@Injectable()
export class AuthService {
    token: string;

    constructor(private router: Router, private http: HttpClient, private store: Store<AppState>) {}

    // login(email: string, password: string) {
    //     this.http
    //         .post(LOGIN_URL, { username: email, password: password })
    //         .subscribe(
    //             (response: { token }) => {
    //                 console.log(response);
    //                 this.token = response.token;
    //                 localStorage.setItem("token", this.token);
    //
    //                 this.setOtherValues(response);
    //                 this.router.navigate([""]);
    //             },
    //             error => {
    //                 console.log(error);
    //             }
    //         );
    // }
    //
    // reload(token: string) {
    //     this.token = token;
    //     console.log('reload');
    //     this.http.get(LOGIN_URL).subscribe(
    //         response => {
    //             this.setOtherValues(response);
    //             console.log("reload", response);
    //         },
    //         error => {
    //             console.log("error: ", error);
    //         }
    //     );
    // }

    /**
     * Sets all other values which came from the server except of the token
     * @param response the response which came from the server after login or reload
     */
    // setOtherValues(response) {
    //     //this.personalUser.setUser(response.user);
    // }

    // logout() {
    //     console.log('logout');
    //     localStorage.removeItem("token");
    //     this.token = null;
    // }

    isAuthenticated() {
        return this.token != null;
    }
}
