/*
 * rlcapp - record and organization management software for refugee law clinics
 * Copyright (C) 2019  Dominik Walser
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

import {Component, OnInit} from '@angular/core';
import { RecordsSandboxService } from "../../services/records-sandbox.service";
import { Observable } from "rxjs";
import { RestrictedRecord} from '../../models/record.model';
import { ActivatedRoute, Router } from "@angular/router";
import {RestrictedUser} from '../../../api/models/user.model';
import {Tag} from '../../models/tag.model';
import {GetRecordsSearchURL} from '../../../statics/api_urls.statics';
import {GetRecordFrontUrl, GetRecordSearchFrontUrl} from '../../../statics/frontend_links.statics';

@Component({
    selector: "app-records",
    templateUrl: "./records-list.component.html",
    styleUrls: ["./records-list.component.scss"]
})
export class RecordsListComponent implements OnInit {
    timeout = 400;
    records: Observable<RestrictedRecord[]>;
    columns = ['access', 'token', 'state', 'consultants', 'tags'];
    value = "";
    timer = null;

    constructor(
        private recordsSandbox: RecordsSandboxService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.route.queryParamMap.subscribe(map => {
            if (map.get("search")) {
                this.recordsSandbox.loadRecords(map.get("search"));
                this.value = map.get("search");
            } else {
                this.recordsSandbox.loadRecords();
            }
        });

    }

    ngOnInit() {
        this.records = this.recordsSandbox.getRecords();
    }

    onSearchClick() {
        if (this.value && this.value !== "") {
            this.router.navigateByUrl(GetRecordSearchFrontUrl(this.value));
        } else this.router.navigateByUrl(`records`);
    }

    onSearchChange(searchValue: string){
        clearTimeout(this.timer);
        this.timer = setTimeout(this.fireSearch.bind(this), this.timeout);
    }

    fireSearch(): void{
        this.onSearchClick();
    }

    onRecordSelect(record: RestrictedRecord){
        this.router.navigateByUrl(GetRecordFrontUrl(record));
    }

    onTagClick(tag: Tag){
        this.router.navigateByUrl(GetRecordSearchFrontUrl(tag.name));

    }

}
