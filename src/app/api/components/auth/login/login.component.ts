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

import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/app.reducers";
import { TryLogin } from "../../../store/auth/auth.actions";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    constructor(
        private auth: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>
    ) {
        if (this.auth.isAuthenticated()) {
            this.router.navigate([""]);
        }
    }

    login = {
        email: "abc@web.de",
        password: "qwe123"
    };

    ngOnInit() {}

    onLogInClick() {
        this.store.dispatch(
            new TryLogin({
                username: this.login.email,
                password: this.login.password
            })
        );
    }

    onRegisterClick(){
        this.router.navigate(['register']);
    }
}
