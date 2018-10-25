import { Component, OnInit } from "@angular/core";
import { ApiState } from "../../store/api.reducers";
import { Store } from "@ngrx/store";
import { StartLoadingOtherUsers } from "../../store/api.actions";
import { Observable } from "rxjs";
import { RestrictedUser } from "../../models/user.model";
import { ApiSandboxService } from "../../services/api-sandbox.service";

@Component({
    selector: "app-profiles-list",
    templateUrl: "./profiles-list.component.html",
    styleUrls: ["./profiles-list.component.scss"]
})
export class ProfilesListComponent implements OnInit {
    otherUsers: Observable<RestrictedUser[]>;

    constructor(private apiSB: ApiSandboxService) {}

    ngOnInit() {
        this.apiSB.startLoadingOtherUsers();
        this.otherUsers = this.apiSB.getOtherUsers();
    }
}
