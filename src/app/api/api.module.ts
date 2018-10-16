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
import { CommonModule } from "@angular/common";
import { ApiRoutingModule } from "./api-routing.module";
import { CustomMaterialModule } from "../custom-material.module";
import { ProfileComponent } from "./components/profile/profile.component";
import { RegisterComponent } from "./components/auth/register/register.component";
import { DashboardComponent } from "./components/Dashboard/dashboard.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { apiReducer } from "./store/api.reducers";
import { EffectsModule } from "@ngrx/effects";
import { ApiEffects } from "./store/api.effects";
import { DateFormatPipe } from "./pipes/api.pipes";
import {MatSnackBar} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        ApiRoutingModule,
        CustomMaterialModule,
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
        DateFormatPipe
    ],
    providers: [DateFormatPipe]
})
export class ApiModule {}
