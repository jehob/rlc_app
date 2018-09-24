import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CustomMaterialModule } from '../custom-material.module';
import { AuthenticationComponent } from './authentication.component';
import { RouterModule } from '@angular/router';
 
 
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomMaterialModule,
    RouterModule
  ],
  declarations: [
      AuthenticationComponent,
      LoginComponent
  ],
  providers: [  ]
})
export class AuthenticationModule {}