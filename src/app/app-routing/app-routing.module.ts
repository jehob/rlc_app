import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {LoginComponent} from '../components/api/authentication/login/login.component';

import {AuthGuardService} from '../services/auth-guard.service';
import { ProfileComponent } from "../components/profile/profile.component";
import { RecordsComponent } from "../components/records/records.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "profile", pathMatch: "full" },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuardService]},
  { path: "records", component: RecordsComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
