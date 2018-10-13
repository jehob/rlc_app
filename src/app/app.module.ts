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

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import { HttpClientModule } from "@angular/common/http";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthService } from "./api/services/auth.service";
import { AuthGuardService } from "./api/services/auth-guard.service";
import { CustomMaterialModule } from "./custom-material.module";
import { DashboardComponent } from "./api/components/Dashboard/dashboard.component";
import { LoginComponent } from "./api/components/auth/login/login.component";
import {reducers} from './store/app.reducers';
import {AuthEffects} from './api/store/auth/auth.effects';
import {ApiSandboxService} from './api/services/api-sandbox.service';
import {ApiModule} from './api/api.module';
import {RecordsModule} from './recordmanagement/records.module';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        CustomMaterialModule,
        BrowserAnimationsModule,
        ApiModule,
        RecordsModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([AuthEffects]),
        StoreDevtoolsModule.instrument(),
        AppRoutingModule,
    ],
    providers: [AuthService, AuthGuardService, ApiSandboxService],
    bootstrap: [AppComponent]
})
export class AppModule {}
