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
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {AppSandboxService} from '../../../services/app-sandbox.service';

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
            this.router.navigate([""]);
        }

        this.loginForm = new FormGroup({
            email: new FormControl("abc@web.de", [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl("formel11.F", [Validators.required])
        });
    }

    ngOnInit() {}

    onLogInClick() {
        console.log('login clicked');
        if (this.loginForm.valid)
            this.appSB.login(this.loginForm.value.email, this.loginForm.value.password);
    }

    onRegisterClick() {
        this.router.navigate(["register"]);
    }
}
