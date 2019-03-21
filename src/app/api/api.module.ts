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

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiRoutingModule } from "./api-routing.module";
import { CustomMaterialModule } from "../custom-material.module";
import { ProfileComponent } from "./pages/profile/profile.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { DashboardComponent } from "./pages/Dashboard/dashboard.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { apiReducer } from "./store/api.reducers";
import { EffectsModule } from "@ngrx/effects";
import { ApiEffects } from "./store/api.effects";
import {SharedModule} from '../shared/shared.module';
import { ProfilesListComponent } from './pages/profiles-list/profiles-list.component';
import { ProfilesListItemComponent } from './components/profiles-list-item/profiles-list-item.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ForeignProfileComponent } from './pages/foreign-profile/foreign-profile.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { GroupsListComponent } from './pages/groups-list/groups-list.component';
import { GroupComponent } from './pages/group/group.component';
import { EditGroupComponent } from './components/edit-group/edit-group.component';
import { ShowGroupComponent } from './components/show-group/show-group.component';
import { AddGroupMemberComponent } from './components/add-group-member/add-group-member.component';
import { PermissionListComponent } from './pages/permission-list/permission-list.component';
import { EditPermissionComponent } from './pages/edit-permission/edit-permission.component';

@NgModule({
    imports: [
        ApiRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature("api", apiReducer),
        EffectsModule.forFeature([ApiEffects])
    ],
    declarations: [
        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        LoginComponent,
        ProfilesListComponent,
        ProfilesListItemComponent,
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
        EditPermissionComponent
    ],
    entryComponents: [AddGroupMemberComponent],
    providers: [],
    exports: [SidebarComponent]
})
export class ApiModule {}
