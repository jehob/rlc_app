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
import { RecordsSandboxService } from "../../services/records-sandbox.service";
import { FullClient } from "../../models/client.model";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

@Component({
    selector: "app-select-client-dialog",
    templateUrl: "./select-client-dialog.component.html",
    styleUrls: ["./select-client-dialog.component.scss"]
})
export class SelectClientDialogComponent implements OnInit {
    possibleClients: Observable<FullClient[]>;
    selectedClient: number;
    takes: number;

    constructor(
        public dialogRef: MatDialogRef<SelectClientDialogComponent>,
        private recordSB: RecordsSandboxService
    ) {
        this.selectedClient = -1;
        this.takes = 0;
    }

    ngOnInit() {
        this.possibleClients = this.recordSB.getPossibleClients().pipe(
            take(2),
            map((actualPossibleClients: Array<any>) => {
                this.takes += 1;
                if (this.takes === 2 && actualPossibleClients.length === 0)
                    this.dialogRef.close(-1);
                return actualPossibleClients;
            })
        );
    }

    onCloseClick() {
        this.dialogRef.close();
    }
}
