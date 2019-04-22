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
import {
    passwordValidator,
    matchValidator
} from "../../../../statics/validators.statics";
import { AppSandboxService } from "../../../services/app-sandbox.service";
import { ActivatedRoute, Params } from "@angular/router";
import { CustomErrorStateMatcher } from "../../../../statics/errror_state_matcher.statics";

@Component({
    selector: "app-reset-password",
    templateUrl: "./reset-password.component.html",
    styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
    resetPasswordForm: FormGroup;
    link_id: string;
    errorStateMatcher = new CustomErrorStateMatcher();

    constructor(
        private appSB: AppSandboxService,
        private route: ActivatedRoute
    ) {
        this.resetPasswordForm = new FormGroup(
            {
                new_password: new FormControl("", [
                    Validators.required,
                    passwordValidator
                ]),
                new_password_confirm: new FormControl("", [Validators.required])
            },
            matchValidator("new_password", "new_password_confirm")
        );
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.link_id = params["id"];
        });
    }

    onSendClick() {
        if (this.resetPasswordForm.valid) {
            const new_pw = this.resetPasswordForm.controls["new_password"]
                .value;
            this.appSB.resetPassword(new_pw, this.link_id);
        }
    }
}
