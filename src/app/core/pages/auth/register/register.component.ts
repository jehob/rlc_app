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
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { MatSnackBar } from "@angular/material";
import { CoreSandboxService } from "../../../services/core-sandbox.service";
import { RestrictedRlc } from "../../../models/rlc.model";
import {
    dateInPastValidator,
    matchValidator,
    passwordValidator
} from "../../../../statics/validators.statics";
import { CustomErrorStateMatcher } from "../../../../statics/errror_state_matcher.statics";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
    // TODO: refactor this
    userForm: FormGroup;
    allRlcs: RestrictedRlc[] = [];
    errorStateMatcher = new CustomErrorStateMatcher();

    constructor(
        private snackBar: MatSnackBar,
        private coreSB: CoreSandboxService
    ) {

    }

    ngOnInit() {
        this.coreSB.startLoadingRlcs();
        const date = new Date();
        date.setFullYear(date.getFullYear() - 20);
        this.userForm = new FormGroup(
            {
                email: new FormControl("", [
                    Validators.required,
                    Validators.email
                ]),
                name: new FormControl("", Validators.required),
                password: new FormControl("", [
                    Validators.required,
                    passwordValidator
                ]),
                password_confirm: new FormControl("", [Validators.required]),
                phone_number: new FormControl(""),
                street: new FormControl(""),
                postal_code: new FormControl(""),
                city: new FormControl(""),
                birthday: new FormControl(date, [dateInPastValidator]),
                rlc: new FormControl("", [Validators.required])
            },
            matchValidator("password", "password_confirm")
        );

        this.coreSB.getAllRlcs().subscribe((rlcs: RestrictedRlc[]) => {
            if (rlcs) {
                this.allRlcs = rlcs;
            }
        });
    }

    onRegisterClick() {
        if (this.userForm.errors && this.userForm.errors.mismatch) {
            this.userForm.controls["password_confirm"].setErrors({
                mismatch: "true"
            });
        }

        if (this.userForm.valid) {
            const values = this.userForm.value;
            const user = {
                name: values.name,
                email: values.email,
                password: values.password,
                birthday: CoreSandboxService.transformDateToString(
                    values.birthday
                ),
                rlc: values.rlc
            };
            if (values.phone_number !== "")
                user["phone_number"] = values.phone_number;
            if (values.street !== "") user["street"] = values.street;
            if (values.postal_code !== "")
                user["postal_code"] = values.postal_code;
            if (values.city !== "") user["city"] = values.city;

            this.coreSB.registerUser(user);
        }
    }
}
