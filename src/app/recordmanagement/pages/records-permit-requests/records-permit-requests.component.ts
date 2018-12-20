import { Component, OnInit } from "@angular/core";
import { RecordsSandboxService } from "../../services/records-sandbox.service";
import {RecordPermissionRequest} from '../../models/record_permission.model';
import {Observable} from 'rxjs';

@Component({
    selector: "app-records-permit-requests",
    templateUrl: "./records-permit-requests.component.html",
    styleUrls: ["./records-permit-requests.component.scss"]
})
export class RecordsPermitRequestsComponent implements OnInit {
    //recordPermissionRequests: RecordPermissionRequest[];
    recordPermissionRequests: Observable<RecordPermissionRequest[]>;

    constructor(private recordSB: RecordsSandboxService) {}

    toProcessColumns = ['request_from', 'record', 'requested', 'state', 'accept'];
    alreadyProcessedColumns = ['request_from', 'record', 'requested', 'state', 'processor', 'processed_on'];

    ngOnInit() {
        this.recordSB.startLoadingRecordPermissionRequests();
        this.recordPermissionRequests = this.recordSB.getRecordPermissionRequests();
    }

    permitRequest(request: RecordPermissionRequest){
        //console.log('request to accept:', request);
        this.recordSB.admitRecordPermissionRequest(request);
    }

    declineRequest(request: RecordPermissionRequest){
        this.recordSB.declineRecordPermissionRequest(request);
    }

    gotoRecord(request: RecordPermissionRequest){
        this.recordSB.navigateToRecordOfRecordPermissionRequest(request);
    }
}
