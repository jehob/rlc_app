import { Component, OnInit } from "@angular/core";
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidatorFn,
    Validators
} from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { ApiSandboxService } from "../../../services/api-sandbox.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
    userForm: FormGroup;

    constructor(
        private snackBar: MatSnackBar,
        private apiSB: ApiSandboxService
    ) {
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
                    this.passwordValidator()
                ]),
                password_confirm: new FormControl("", [Validators.required]),
                phone_number: new FormControl(""),
                street: new FormControl(""),
                postal_code: new FormControl(""),
                city: new FormControl(""),
                birthday: new FormControl(date)
            },
            this.passwordMatchValidator
        );
    }

    ngOnInit() {}

    onRegisterClick() {
        if (this.userForm.errors && this.userForm.errors.mismatch) {
            this.userForm.controls["password_confirm"].setErrors({
                mismatch: "true"
            });
        }

        if (this.userForm.valid) {
            const values = this.userForm.value;
            const user = {
                'name': values.name,
                'email': values.email,
                'password': values.password,
                'birthday': values.birthday
            };
            if (values.phone_number !== '')
                user['phone_number'] = values.phone_number;
            if (values.street !== '')
                user['street'] = values.street;
            if (values.postal_code !== '')
                user['postal_code'] = values.postal_code;
            if (values.city !== '')
                user['city'] = values.city;

            this.apiSB.registerUser(user);
        }
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get("password").value === g.get("password_confirm").value
            ? null
            : { mismatch: true };
    }

    passwordValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const password: string = control.value;
            const hasNumber = /\d/.test(password);
            const hasUpper = /[A-Z]/.test(password);
            const hasLower = /[a-z]/.test(password);
            const hasSpecial = /[$@!%*?&+=#'"`\/<>,.^()[\]\\|{}]/.test(password);
            const length = password.length >= 9;
            if (!hasNumber || !hasUpper || !hasLower || !hasSpecial)
                return { weak: "true" };
            else if (!length) return { short: "true" };
            return null;
        };
    }
}
