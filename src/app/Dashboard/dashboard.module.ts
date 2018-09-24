import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { RecordsComponent } from './records/records.component';
import { CustomMaterialModule } from '../custom-material.module';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
 
 
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomMaterialModule,
    RouterModule
  ],
  declarations: [
      DashboardComponent,
      ProfileComponent,
      RecordsComponent
  ],
  providers: [  ]
})
export class DashboardModule {}