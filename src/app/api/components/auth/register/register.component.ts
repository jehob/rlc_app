import { Component, OnInit } from "@angular/core";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
    userForm: FormGroup;


    constructor(private snackBar: MatSnackBar) {
        this.userForm = new FormGroup({
           email: new FormControl("", Validators.required),
           name: new FormControl("", Validators.required),
           password: new FormControl("", Validators.required),
           password_repeat: new FormControl("", Validators.required),
           phone_number: new FormControl(""),
           street: new FormControl(""),
           postal_code: new FormControl(""),
           city: new FormControl(""),
           birthday: new FormControl(new Date()),
        });
    }

    ngOnInit() {}

    onRegisterClick(){
        console.log('registerClick');


    }


}
