import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import {AppSandboxService} from '../../../services/app-sandbox.service';

@Component({
    selector: "app-forgot-password",
    templateUrl: "./forgot-password.component.html",
    styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent implements OnInit {
    email_form: FormGroup;

    constructor(private appSB: AppSandboxService) {
        this.email_form = new FormGroup({
            email: new FormControl("")
        });
    }

    ngOnInit() {}

    onResetPasswordClick() {
        if (this.email_form.valid)
            this.appSB.forgotPassword(this.email_form.controls['email'].value);
    }
}
