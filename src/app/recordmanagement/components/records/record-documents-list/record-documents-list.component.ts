import {Component, Input, OnInit} from '@angular/core';
import {RecordsSandboxService} from '../../../services/records-sandbox.service';
import {RecordDocument} from '../../../models/record_documents.model';



@Component({
    selector: "app-record-documents-list",
    templateUrl: "./record-documents-list.component.html",
    styleUrls: ["./record-documents-list.component.scss"]
})
export class RecordDocumentsListComponent implements OnInit {
    @Input()
    documents: RecordDocument;

    constructor(private recordSB: RecordsSandboxService) {}

    ngOnInit() {}


    dropped($event){
        event.preventDefault();
        const files = $event.dataTransfer.files;
        this.recordSB.uploadRecordDocuments(files);

    }

    selected($event){
        event.preventDefault();
        console.log($event);
    }

    onDocumentClick(document: RecordDocument){
        this.recordSB.downloadRecordDocument(document.name);
    }
}
