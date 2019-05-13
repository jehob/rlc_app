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

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActionReducer, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import LogRocket from "logrocket";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthGuardService } from "./api/services/auth-guard.service";
import { CustomMaterialModule } from "./custom-material.module";
import { reducers } from "./store/app.reducers";
import { AuthEffects } from "./api/store/auth/auth.effects";
import { ApiSandboxService } from "./api/services/api-sandbox.service";
import { ApiModule } from "./api/api.module";
import { RecordsSandboxService } from "./recordmanagement/services/records-sandbox.service";
import { AuthInterceptor } from "./api/services/auth.interceptor";
import { environment } from "../environments/environment";
import { AppSandboxService } from "./api/services/app-sandbox.service";
import { StorageService } from "./shared/services/storage.service";
import { SnackbarService } from "./shared/services/snackbar.service";

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
const reduxMiddleware = LogRocket.reduxMiddleware();

export function logrocketMiddleware(reducer): ActionReducer<any, any> {
    let currentState;
    const fakeDispatch = reduxMiddleware({
        getState: () => currentState
    })(() => {});

    return function(state, action) {
        const newState = reducer(state, action);
        currentState = state;
        fakeDispatch(action);
        return newState;
    };
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CustomMaterialModule,
        BrowserAnimationsModule,
        ApiModule,
        AppRoutingModule,
        StoreModule.forRoot(reducers, { metaReducers: [logrocketMiddleware] }),
        EffectsModule.forRoot([AuthEffects]),
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ],
    providers: [
        AuthGuardService,
        AppSandboxService,
        ApiSandboxService,
        RecordsSandboxService,
        StorageService,
        SnackbarService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
         // {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
        // { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
