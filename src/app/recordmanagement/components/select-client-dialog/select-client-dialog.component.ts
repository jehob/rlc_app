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
