import {Component, Input, OnInit} from '@angular/core';
import {FullRecord, RestrictedRecord} from '../../../models/record.model';

@Component({
    selector: "app-records-list-item",
    templateUrl: "./records-list-item.component.html",
    styleUrls: ["./records-list-item.component.scss"]
})
export class RecordsListItemComponent implements OnInit {
    @Input() record: RestrictedRecord;
    state: string;
    fullAccess: boolean;

    constructor() { }

    ngOnInit() {
        this.state = this.record.state;

        this.fullAccess = this.record instanceof FullRecord;
    }
}
