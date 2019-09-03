import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilesMainViewComponent} from './components/files-main-view/files-main-view.component';
import {FilemanagementRoutingModule} from './filemanagement-routing.module';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        FilemanagementRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [
        FilesMainViewComponent,
    ]
})
export class FilemanagementModule {

}
