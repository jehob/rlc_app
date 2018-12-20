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
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

import {RecordsSandboxService} from '../../../../services/records-sandbox.service';
import {RecordDocument} from '../../../../models/record_document.model';

@Component({
    selector: "app-record-documents-list",
    templateUrl: "./record-documents-list.component.html",
    styleUrls: ["./record-documents-list.component.scss"]
})
export class RecordDocumentsListComponent implements OnInit {
    @Input()
    documents: RecordDocument;

    @ViewChild("fileInput")
    fileInput: ElementRef<HTMLInputElement>;

    constructor(private recordSB: RecordsSandboxService) {}

    ngOnInit() {}


    dropped($event){
        event.preventDefault();
        const files = $event.dataTransfer.files;
        this.recordSB.uploadRecordDocuments(files);

    }

    selected($event){
        event.preventDefault();
        //console.log($event);
        const files = Array.from(this.fileInput.nativeElement.files);
        this.recordSB.uploadRecordDocuments(files);
    }

    onDocumentClick(document: RecordDocument){
        this.recordSB.downloadRecordDocument(document.name);
    }

    dragover($event){
        $event.preventDefault();
    }
}
