import { Component, OnInit } from "@angular/core";
import { RecordsSandboxService } from "../../services/records-sandbox.service";

@Component({
    selector: "app-records-permit-requests",
    templateUrl: "./records-permit-requests.component.html",
    styleUrls: ["./records-permit-requests.component.scss"]
})
export class RecordsPermitRequestsComponent implements OnInit {
    constructor(private recordSB: RecordsSandboxService) {}

    ngOnInit() {
        this.recordSB.startLoadingRecordPermissionRequests();
    }
}
