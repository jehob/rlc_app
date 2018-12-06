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

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecordsRoutingModule } from "./records-routing.module";
import { RecordsListComponent } from "./pages/record-list/records-list.component";
import { CustomMaterialModule } from "../custom-material.module";
import { StoreModule } from "@ngrx/store";
import { recordsReducer } from "./store/records.reducers";
import { EffectsModule } from "@ngrx/effects";
import { RecordsEffects } from "./store/effects/records.effects";
import { RecordsListItemComponent } from "./components/records/records-list-item/records-list-item.component";
import { CreateRecordComponent } from "./pages/create-record/create-record.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SelectClientDialogComponent } from "./components/select-client-dialog/select-client-dialog.component";
import { RecordsSandboxService } from "./services/records-sandbox.service";
import { ChipAutocompleteComponent } from "../shared/components/chip-autocomplete/chip-autocomplete.component";
import { SharedModule } from "../shared/shared.module";
import { RecordComponent } from "./pages/record/record.component";
import { FullRecordDetailComponent } from "./components/records/full-record-detail/full-record-detail.component";
import { RestrictedRecordDetailComponent } from "./components/records/restricted-record-detail/restricted-record-detail.component";
import { ConsultantsFieldComponent } from "./components/consultants-field/consultants-field.component";
import { RecordDocumentsListComponent } from "./components/records/documents/record-documents-list/record-documents-list.component";
import { RecordMessagesComponent } from "./components/records/messages/record-messages/record-messages.component";
import { RecordMessageItemComponent } from "./components/records/messages/record-message-item/record-message-item.component";
import { RecordDocumentItemComponent } from "./components/records/documents/record-document-item/record-document-item.component";
import { RecordsAddEffects } from "./store/effects/records-add.effects";
import { RecordsLoadingEffects } from "./store/effects/records-loading.effects";
import { RecordsPermitRequestsComponent } from './pages/records-permit-requests/records-permit-requests.component';
import { RecordPermissionRequestItemComponent } from './components/admin/record-permission-request-item/record-permission-request-item.component';

@NgModule({
    imports: [
        RecordsRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature("records", recordsReducer),
        EffectsModule.forFeature([
            RecordsEffects,
            RecordsAddEffects,
            RecordsLoadingEffects
        ])
    ],
    declarations: [
        RecordsListComponent,
        RecordsListItemComponent,
        CreateRecordComponent,
        SelectClientDialogComponent,
        RecordComponent,
        FullRecordDetailComponent,
        RestrictedRecordDetailComponent,
        ConsultantsFieldComponent,
        RecordDocumentsListComponent,
        RecordMessagesComponent,
        RecordMessageItemComponent,
        RecordDocumentItemComponent,
        RecordsPermitRequestsComponent,
        RecordPermissionRequestItemComponent
    ],
    entryComponents: [SelectClientDialogComponent]
})
export class RecordsModule {
    constructor(private recordSB: RecordsSandboxService) {
        this.recordSB.startLoadingRecordStatics();

    }
}
