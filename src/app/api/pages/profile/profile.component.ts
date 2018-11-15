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

import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FullUser } from "../../models/user.model";
import { ApiSandboxService } from "../../services/api-sandbox.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { take } from "rxjs/operators";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
    userForm: FormGroup;
    name = "";
    @ViewChild("fileInput")
    fileInput: ElementRef<HTMLInputElement>;

    constructor(private apiSB: ApiSandboxService) {
        this.userForm = new FormGroup({
            email: new FormControl(""),
            phone_number: new FormControl(""),
            street: new FormControl(""),
            postal_code: new FormControl(""),
            city: new FormControl(""),
            birthday: new FormControl("")
        });
    }

    ngOnInit() {
        this.apiSB
            .getUser()
            .pipe(take(2))
            .subscribe((user: FullUser) => {
                if (user) {
                    this.name = user.name;
                    this.userForm = new FormGroup({
                        email: new FormControl(user.email, Validators.required),
                        phone_number: new FormControl(user.phone_number, [
                            Validators.maxLength(15),
                            Validators.minLength(9)
                        ]),
                        street: new FormControl(user.street),
                        postal_code: new FormControl(user.postal_code),
                        city: new FormControl(user.city),
                        birthday: new FormControl(user.birthday)
                    });
                }
            });
    }

    onSaveClick() {
        this.apiSB.patchUser(
            new FullUser(
                undefined,
                this.userForm.value.email,
                undefined,
                new Date(this.userForm.value.birthday),
                this.userForm.value.phone_number,
                this.userForm.value.street,
                this.userForm.value.city,
                this.userForm.value.postal_code
            )
        );
    }

    onUploadClick() {
        console.log(this.fileInput.nativeElement.files);
        const file = this.fileInput.nativeElement.files[0];
        this.apiSB.uploadProfilePicture(file);
        //this.apiSB.downloadSingleFile('aaa');
    }
}
