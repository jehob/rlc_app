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
import { AuthGuardService } from "./core/services/auth-guard.service";
import { CustomMaterialModule } from "./custom-material.module";
import { reducers } from "./store/app.reducers";
import { AuthEffects } from "./core/store/auth/auth.effects";
import { CoreSandboxService } from "./core/services/core-sandbox.service";
import { CoreModule } from "./core/core.module";
import { RecordsSandboxService } from "./recordmanagement/services/records-sandbox.service";
import { AuthInterceptor } from "./core/services/auth.interceptor";
import { environment } from "../environments/environment";
import { AppSandboxService } from "./core/services/app-sandbox.service";
import { StorageService } from "./shared/services/storage.service";
import { SnackbarService } from "./shared/services/snackbar.service";

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
        CoreModule,
        AppRoutingModule,
        StoreModule.forRoot(reducers, { metaReducers: [logrocketMiddleware] }),
        EffectsModule.forRoot([AuthEffects]),
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ],
    providers: [
        AuthGuardService,
        AppSandboxService,
        CoreSandboxService,
        RecordsSandboxService,
        StorageService,
        SnackbarService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
