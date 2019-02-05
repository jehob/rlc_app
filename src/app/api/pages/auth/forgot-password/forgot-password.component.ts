import { Component, OnInit } from "@angular/core";
import { ApiSandboxService } from "../../../services/api-sandbox.service";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: "app-forgot-password",
    templateUrl: "./forgot-password.component.html",
    styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent implements OnInit {
    email_form: FormGroup;

    constructor(private apiSB: ApiSandboxService) {
        this.email_form = new FormGroup({
            email: new FormControl("")
        });
    }

    ngOnInit() {}

    onResetPasswordClick() {
        console.log("email", this.email_form.controls['email'].value);
    }
}
