import {Component, Input, OnInit} from '@angular/core';
import {RecordPermissionRequest} from '../../../models/record_permission.model';

@Component({
    selector: "app-record-permission-request-item",
    templateUrl: "./record-permission-request-item.component.html",
    styleUrls: ["./record-permission-request-item.component.scss"]
})
export class RecordPermissionRequestItemComponent implements OnInit {
    @Input()
    recordPermissionRequest: RecordPermissionRequest;

    constructor() {}

    ngOnInit() {}
}
