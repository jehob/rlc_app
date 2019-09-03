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

import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import { AuthState } from "../store/auth/auth.reducers";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { catchError, switchMap, take } from "rxjs/operators";
import { AppSandboxService } from "./app-sandbox.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private store: Store<AuthState>,
        private appSB: AppSandboxService
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return this.store.select("auth").pipe(
            take(1),
            switchMap((authState: AuthState) => {
                if (req.url.startsWith("http")) {
                    return next.handle(req);
                }

                const copiedReq = req.clone({
                    headers: req.headers.set(
                        "Authorization",
                        "Token " + authState.token
                    )
                });
                return next.handle(copiedReq).pipe(
                    catchError((error, caught) => {
                        if (error.status === 401) {
                            this.appSB.saveLocation();
                            this.appSB.logout();
                            return [];
                        }
                        throw error;
                    })
                );
            })
        );
    }
}
