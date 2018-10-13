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
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import { AuthGuardService } from "./api/services/auth-guard.service";
import { DashboardComponent } from "./api/components/Dashboard/dashboard.component";
import { LoginComponent } from "./api/components/auth/login/login.component";


const appRoutes: Routes = [
    // { path: "records", loadChildren: './recordmanagement/records.module#RecordsModule'},
    { path: "", pathMatch: "full" , component: DashboardComponent, canActivate: [AuthGuardService]},
    { path: "login", component: LoginComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes,  {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
