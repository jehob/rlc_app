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

import { AppRoutingModule } from "./api/app-routing/app-routing.module";
import { AppComponent } from "./app.component";
import { AuthService } from "./services/auth.service";
import { HttpClientModule } from "@angular/common/http";
import { AuthGuardService } from "./services/auth-guard.service";
import { CustomMaterialModule } from "./custom-material.module";
import { DashboardComponent } from "./Dashboard/dashboard.component";
import { ProfileComponent } from "./Dashboard/profile/profile.component";
import { RecordsComponent } from "./Dashboard/records/records.component";
import { LoginComponent } from "./api/auth/login/login.component";

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        ProfileComponent,
        RecordsComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        CustomMaterialModule,
        BrowserAnimationsModule,
        AppRoutingModule
    ],
    providers: [AuthService, AuthGuardService],
    bootstrap: [AppComponent]
})
export class AppModule {}
