/*
 * rlcapp - record and organization management software for refugee law clinics
 * Copyright (C) 2018  Dominik Walser
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>
 ******************************************************************************/

import {Component, Input, OnInit} from '@angular/core';
import {FullRecord, RestrictedRecord} from '../../../models/record.model';
import {RestrictedUser} from '../../../../api/models/user.model';
import {Router} from '@angular/router';
import {GetRecordsSearchURL} from '../../../../statics/api_urls.statics';
import {Tag} from '../../../models/tag.model';

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

    onTagClick(tag: Tag){
        this.router.navigateByUrl(`records?search=${tag.name}`);
    }

    onRecordSelect(){
        this.router.navigateByUrl(`records/${this.record.id}`);
    }
}
