import {Component, Input, OnInit} from '@angular/core';
import {FullRecord, RestrictedRecord} from '../../../models/record.model';
import {RestrictedUser} from '../../../../api/models/user.model';
import {Router} from '@angular/router';
import {GetRecordsSearchURL} from '../../../../statics/api_urls.statics';
import {RecordTag} from '../../../models/record_tags.model';

@Component({
    selector: "app-records-list-item",
    templateUrl: "./records-list-item.component.html",
    styleUrls: ["./records-list-item.component.scss"]
})
export class RecordsListItemComponent implements OnInit {
    @Input() record: RestrictedRecord;
    state: string;
    fullAccess: boolean;

    constructor(private router: Router) { }

    ngOnInit() {
        this.state = this.record.state;
        this.fullAccess = this.record instanceof FullRecord;
    }

    onConsultantClick(consultant: RestrictedUser){
        this.router.navigateByUrl(`records?search=${consultant.name}`);
    }

    onTagClick(tag: RecordTag){
        this.router.navigateByUrl(`records?search=${tag.name}`);
    }

    onRecordSelect(){
        this.router.navigateByUrl(`records/${this.record.id}`);
    }
}
