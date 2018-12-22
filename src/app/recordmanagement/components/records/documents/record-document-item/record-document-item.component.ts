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
import {RecordDocument} from '../../../../models/record_document.model';
import {RecordsSandboxService} from '../../../../services/records-sandbox.service';
import {SetRecordDocumentTags} from '../../../../store/actions/records.actions';
import {Tag} from '../../../../models/tag.model';
import {Observable} from 'rxjs';

@Component({
    selector: "app-record-document-item",
    templateUrl: "./record-document-item.component.html",
    styleUrls: ["./record-document-item.component.scss"]
})
export class RecordDocumentItemComponent implements OnInit {
    @Input()
    record_document: RecordDocument;

    record_document_tags: Observable<Tag[]>;

    selectedTags: Tag[];

    constructor(private recordSB: RecordsSandboxService) {
        this.record_document_tags = this.recordSB.getRecordDocumentTags();
    }

    ngOnInit() {
        this.selectedTags = this.record_document.tags;
    }

    onDownload(event){
        event.stopPropagation();
        this.recordSB.downloadRecordDocument(this.record_document.name);
    }

    selectedDocumentTagsChanged(selectedTags: Tag[]){
        this.recordSB.startSettingDocumentTags(selectedTags, this.record_document.id.toString());
    }
}
