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

import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "./services/auth-guard.service";
import { NgModule } from "@angular/core";
import { ProfileComponent } from "./pages/profile/profile.component";
import { DashboardComponent } from "./pages/Dashboard/dashboard.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import {RegisterComponent} from './pages/auth/register/register.component';
import {ProfilesListComponent} from './pages/profiles-list/profiles-list.component';

const apiRoutes: Routes = [
    {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "profiles",
        component: ProfilesListComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "",
        pathMatch: "full",
        component: DashboardComponent,
        canActivate: [AuthGuardService]
    },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent}
];

@NgModule({
    imports: [RouterModule.forChild(apiRoutes)],
    exports: [RouterModule],
    providers: [AuthGuardService]
})
export class ApiRoutingModule {}
