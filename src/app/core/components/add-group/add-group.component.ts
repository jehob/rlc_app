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
import { MatDialogRef } from "@angular/material";
import { CoreSandboxService } from "../../services/core-sandbox.service";
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: "app-add-group",
    templateUrl: "./add-group.component.html",
    styleUrls: ["./add-group.component.scss"]
})
export class AddGroupComponent implements OnInit {
    addGroupForm: FormGroup;

    constructor(
        private coreSB: CoreSandboxService,
        public dialogRef: MatDialogRef<AddGroupComponent>
    ) {}

    ngOnInit() {
        this.addGroupForm = new FormGroup({
            name: new FormControl("", [Validators.required]),
            visible: new FormControl(true)
        });
    }

    onAddClick(): void {
        const newGroup = {
            name: this.addGroupForm.controls['name'].value,
            visible: this.addGroupForm.controls['visible'].value
        };
        this.coreSB.startAddingGroup(newGroup);
        this.dialogRef.close();
    }

    onCloseClick(): void {
        this.dialogRef.close();
    }
}
