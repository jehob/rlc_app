import { Component, Input, OnInit } from "@angular/core";
import { RecordMessage } from "../../../models/record_message.model";
import {ApiSandboxService} from '../../../../api/services/api-sandbox.service';
import {FullUser} from '../../../../api/models/user.model';

@Component({
    selector: "app-record-message-item",
    templateUrl: "./record-message-item.component.html",
    styleUrls: ["./record-message-item.component.scss"]
})
export class RecordMessageItemComponent implements OnInit {
    @Input()
    message: RecordMessage;

    ownMessage: boolean;

    constructor(private apiSB: ApiSandboxService) {}

    ngOnInit() {
        let own = null;
        this.apiSB.getUser().subscribe((user: FullUser) => {
            own = user.id;
        }).unsubscribe();

        if (own === this.message.sender.id){
            this.ownMessage = true;
        } else {
            this.ownMessage = false;
        }
    }
}
