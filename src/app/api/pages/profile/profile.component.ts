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

import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FullUser } from "../../models/user.model";
import { ApiSandboxService } from "../../services/api-sandbox.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { take } from "rxjs/operators";
import { dateInPastValidator } from "../../../statics/validators.statics";
import { State } from "../../models/state.model";
import { Observable } from "rxjs";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
    userForm: FormGroup;
    allUserStates: Observable<State[]>;
    selectedUserState: State;
    selUserState: Observable<State>;
    allUserRecordStates: Observable<State[]>;
    selectedUserRecordState: State;
    user: FullUser;

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
                    this.user = user;
                    this.setValues();
                }
            });
        this.allUserStates = this.apiSB.getUserStates();
        this.allUserRecordStates = this.apiSB.getUserRecordStates();
    }

    setValues(): void {
        this.userForm.controls["phone_number"].setValue(this.user.phone_number);
        this.userForm.controls["street"].setValue(this.user.street);
        this.userForm.controls["postal_code"].setValue(this.user.postal_code);
        this.userForm.controls["city"].setValue(this.user.city);
        this.userForm.controls["birthday"].setValue(this.user.birthday);

        this.apiSB
            .getUserStateByAbbreviation(this.user.user_state)
            .subscribe((user_state: State) => {
                this.selectedUserState = user_state;
            });
        this.apiSB
            .getUserRecordStateByAbbreviation(this.user.user_record_state)
            .subscribe((user_record_state: State) => {
                this.selectedUserRecordState = user_record_state;
            });
    }

    loadValuesToUser(): void {
        this.user.phone_number = this.userForm.value["phone_number"];
        this.user.street = this.userForm.value["street"];
        this.user.postal_code = this.userForm.value["postal_code"];
        this.user.phone_number = this.userForm.value["phone_number"];
        this.user.city = this.userForm.value["city"];
        this.user.birthday = new Date(this.userForm.value["birthday"]);
        if (this.selectedUserState)
            this.user.user_state = this.selectedUserState.abbreviation;
        if (this.selectedUserRecordState)
            this.user.user_record_state = this.selectedUserRecordState.abbreviation;
    }

    onSaveClick() {
        this.loadValuesToUser();
        this.apiSB.startSavingUser(this.user);
    }

    onSelectedUserStateChanged(newSelectedState: State): void {
        this.selectedUserState = newSelectedState;
    }

    onSelectedUserRecordStateChanged(newSelectedState: State): void {
        this.selectedUserRecordState = newSelectedState;
    }
}
