import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {AuthGuardService} from '../services/auth-guard.service';
import { DashboardComponent } from "../Dashboard/dashboard.component";
import { AuthenticationComponent } from "../Authentication/authentication.component";
import { ProfileComponent } from "../Dashboard/profile/profile.component";
import { RecordsComponent } from "../Dashboard/records/records.component";
import { LoginComponent } from "../Authentication/login/login.component";

const appRoutes: Routes = [
  { path: 'dashboard',   
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: 'profile', component: ProfileComponent},
      {path: 'records', component: RecordsComponent}] 
  },
  { path: 'auth',   
    component: AuthenticationComponent,
    children: [
      {path: 'login', component: LoginComponent}
      //{path: 'register', component: }
    ] 
  },
  { path: '',   redirectTo: '/auth/login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
