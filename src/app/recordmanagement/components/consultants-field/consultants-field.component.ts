import { Component, Input, OnInit } from "@angular/core";
import { RestrictedUser } from "../../../api/models/user.model";
import {Router} from '@angular/router';
import {GetRecordsSearchURL} from '../../../statics/api_urls.statics';

@Component({
    selector: "app-consultants-field",
    templateUrl: "./consultants-field.component.html",
    styleUrls: ["./consultants-field.component.scss"]
})
export class ConsultantsFieldComponent implements OnInit {
    @Input()
    consultants: RestrictedUser[];

    constructor(private router: Router) {}

    ngOnInit() {}

    onConsultantClick(consultant: RestrictedUser){
        this.router.navigateByUrl(`records?search=${consultant.name}`);
    }
}
