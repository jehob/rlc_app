import {Component, Input, OnInit} from '@angular/core';
import {RestrictedRecord} from '../../../models/record.model';

@Component({
    selector: "app-records-list-item",
    templateUrl: "./records-list-item.component.html",
    styleUrls: ["./records-list-item.component.scss"]
})
export class RecordsListItemComponent implements OnInit {
    @Input() record: RestrictedRecord;

    constructor() {}

    ngOnInit() {
        if (this.record)
            console.log(this.record.working_on_record);
    }
}
