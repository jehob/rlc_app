/*
 * rlcapp - record and organization management software for refugee law clinics
 * Copyright (C) 2019  Dominik Walser
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
import { NgModule } from "@angular/core";
import { AuthGuardService } from "./services/auth-guard.service";
import { ProfileComponent } from "./pages/profile/profile.component";
import { DashboardComponent } from "./pages/Dashboard/dashboard.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { ProfilesListComponent } from "./pages/profiles-list/profiles-list.component";
import { ForeignProfileComponent } from "./pages/foreign-profile/foreign-profile.component";
import { ForgotPasswordComponent } from "./pages/auth/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./pages/auth/reset-password/reset-password.component";
import { GroupsListComponent } from "./pages/groups-list/groups-list.component";
import { GroupComponent } from "./pages/group/group.component";
import { PermissionListComponent } from "./pages/permission-list/permission-list.component";
import { EditPermissionComponent } from "./pages/edit-permission/edit-permission.component";
import { NewUserRequestsComponent } from "./pages/new-user-requests/new-user-requests.component";
import { ActivateUserComponent } from "./pages/auth/activate-user/activate-user.component";
import {LegalNoticeComponent} from './pages/legal-notice/legal-notice.component';
import {InactiveUsersComponent} from './pages/inactive-users/inactive-users.component';
import {PrivacyStatementComponent} from './pages/privacy-statement/privacy-statement.component';

const apiRoutes: Routes = [
    {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "profiles",
        pathMatch: "full",
        component: ProfilesListComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "",
        pathMatch: "full",
        component: DashboardComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "profiles/:id",
        component: ForeignProfileComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "groups",
        pathMatch: "full",
        component: GroupsListComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "groups/:id",
        component: GroupComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "permissions",
        pathMatch: "full",
        component: PermissionListComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "permissions/:id",
        component: EditPermissionComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "new_user_requests",
        component: NewUserRequestsComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "inactive_users",
        component: InactiveUsersComponent,
        canActivate: [AuthGuardService]
    },
    // without access control
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "forgot-password", component: ForgotPasswordComponent },
    { path: "reset-password/:id", component: ResetPasswordComponent },
    { path: "activate_account/:link", component: ActivateUserComponent },
    { path: "legal_notice", component: LegalNoticeComponent },
    { path: "privacy_statement", component: PrivacyStatementComponent }
];

@NgModule({
    imports: [RouterModule.forChild(apiRoutes)],
    exports: [RouterModule],
    providers: [AuthGuardService]
})
export class ApiRoutingModule {}
