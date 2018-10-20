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
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ReadFromInjectorFn } from "@angular/core/src/render3/di";
import {ApiSandboxService} from '../../../services/api-sandbox.service';
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
            password: new FormControl("qwe123", [Validators.required])
        });
    }

    ngOnInit() {}

    onLogInClick() {
        if (this.loginForm.valid)
            this.appSB.login(this.loginForm.value.email, this.loginForm.value.password);
    }

    onRegisterClick() {
        this.router.navigate(["register"]);
    }
}
