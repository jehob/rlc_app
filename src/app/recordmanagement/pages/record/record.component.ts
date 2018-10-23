import { Component, OnInit } from "@angular/core";
import { RecordsSandboxService } from "../../services/records-sandbox.service";
import {FullRecord, RestrictedRecord} from '../../models/record.model';
import { ActivatedRoute, Params } from "@angular/router";

@Component({
    selector: "app-record",
    templateUrl: "./record.component.html",
    styleUrls: ["./record.component.scss"]
})
export class RecordComponent implements OnInit {
    id: string;
    type: string;

    constructor(
        private recordSB: RecordsSandboxService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params["id"];
            this.recordSB.loadAndGetSpecialRecord(this.id).subscribe((special_record) => {
                if (special_record.client){
                    this.type = 'FullRecord';
                } else {
                    this.type = 'RestrictedRecord';
                }
            });
        });
    }


}
