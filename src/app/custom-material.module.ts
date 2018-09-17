import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButton, MatButtonModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    MatButtonModule
  ],
  declarations: []
})
export class CustomMaterialModule { }
