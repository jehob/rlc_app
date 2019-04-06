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

import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {AppSandboxService} from '../../../services/app-sandbox.service';
import {FORGOT_PASSWORD_FRONT_URL, MAIN_PAGE_FRONT_URL, REGISTER_FRONT_URL} from '../../../../statics/frontend_links.statics';

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private appSB: AppSandboxService
    ) {
        if (this.appSB.isAuthenticated()) {
            this.router.navigate([MAIN_PAGE_FRONT_URL]);
        }

        this.loginForm = new FormGroup({
            email: new FormControl("abc@web.de", [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl("qwe123", [Validators.required])
        });
    }

    ngOnInit() {}

    onLogInClick() {
        if (this.loginForm.valid)
            this.appSB.login(this.loginForm.value.email, this.loginForm.value.password);
    }

    onRegisterClick() {
        this.router.navigate([REGISTER_FRONT_URL]);
    }

    onForgotPasswordClick(){
        this.router.navigate([FORGOT_PASSWORD_FRONT_URL]);
    }
}
