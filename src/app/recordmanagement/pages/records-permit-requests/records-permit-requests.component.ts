import { Component, OnInit } from "@angular/core";
import { RecordsSandboxService } from "../../services/records-sandbox.service";
import {RecordPermissionRequest} from '../../models/record_permission.model';

@Component({
    selector: "app-records-permit-requests",
    templateUrl: "./records-permit-requests.component.html",
    styleUrls: ["./records-permit-requests.component.scss"]
})
export class RecordsPermitRequestsComponent implements OnInit {
    recordPermissionRequests: RecordPermissionRequest[];

    constructor(private recordSB: RecordsSandboxService) {}

    ngOnInit() {
        this.recordSB.startLoadingRecordPermissionRequests();

        this.recordSB.getRecordPermissionRequests().subscribe((RecordPermissionRequests: RecordPermissionRequest[]) => {
            this.recordPermissionRequests = RecordPermissionRequests;
        });

    }
}
