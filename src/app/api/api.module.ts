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

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTabsModule } from "@angular/material";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { NgModule } from "@angular/core";

import { ApiRoutingModule } from "./api-routing.module";
import { ProfileComponent } from "./pages/profile/profile.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { DashboardComponent } from "./pages/Dashboard/dashboard.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { apiReducer } from "./store/api.reducers";
import { ApiEffects } from "./store/api.effects";
import { SharedModule } from "../shared/shared.module";
import { ProfilesListComponent } from "./pages/profiles-list/profiles-list.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ForeignProfileComponent } from "./pages/foreign-profile/foreign-profile.component";
import { ForgotPasswordComponent } from "./pages/auth/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./pages/auth/reset-password/reset-password.component";
import { GroupsListComponent } from "./pages/groups-list/groups-list.component";
import { GroupComponent } from "./pages/group/group.component";
import { EditGroupComponent } from "./components/edit-group/edit-group.component";
import { ShowGroupComponent } from "./components/show-group/show-group.component";
import { AddGroupMemberComponent } from "./components/add-group-member/add-group-member.component";
import { PermissionListComponent } from "./pages/permission-list/permission-list.component";
import { EditPermissionComponent } from "./pages/edit-permission/edit-permission.component";
import { AddHasPermissionComponent } from "./components/add-has-permission/add-has-permission.component";
import { HasPermissionsListComponent } from "./components/has-permissions-list/has-permissions-list.component";
import { HasPermissionSideComponent } from "./components/has-permission-side/has-permission-side.component";
import { AddHasPermissionForComponent } from "./components/add-has-permission-for/add-has-permission-for.component";
import { AddGroupComponent } from "./components/add-group/add-group.component";
import { NewUserRequestsComponent } from "./pages/new-user-requests/new-user-requests.component";
import {
    NewUserRequestProcessedPipe,
    NewUserRequestRequestedPipe
} from "../recordmanagement/pipes/new_user_request.pipe";
import { ActivateUserComponent } from './pages/auth/activate-user/activate-user.component';

@NgModule({
    imports: [
        ApiRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature("api", apiReducer),
        EffectsModule.forFeature([ApiEffects]),
        MatTabsModule
    ],
    declarations: [
        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        LoginComponent,
        ProfilesListComponent,
        SidebarComponent,
        ForeignProfileComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        GroupsListComponent,
        GroupComponent,
        EditGroupComponent,
        ShowGroupComponent,
        AddGroupMemberComponent,
        PermissionListComponent,
        EditPermissionComponent,
        AddHasPermissionComponent,
        HasPermissionsListComponent,
        HasPermissionSideComponent,
        AddHasPermissionForComponent,
        AddGroupComponent,
        NewUserRequestsComponent,
        NewUserRequestRequestedPipe,
        NewUserRequestProcessedPipe,
        ActivateUserComponent
    ],
    entryComponents: [
        AddGroupMemberComponent,
        AddHasPermissionComponent,
        AddHasPermissionForComponent,
        AddGroupComponent
    ],
    providers: [],
    exports: [SidebarComponent]
})
export class ApiModule {}
