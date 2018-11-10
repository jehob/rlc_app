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

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, mergeMap, take } from "rxjs/operators";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
import moment from "moment";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../store/app.reducers";
import { ApiState } from "../store/api.reducers";
import { FullUser } from "../models/user.model";
import {
    StartCreateUser,
    StartLoadingOtherUsers,
    StartPatchUser
} from "../store/api.actions";
import { RLCS_URL } from "../../statics/api_urls.statics";
import { ResponseContentType } from "@angular/http";

@Injectable()
export class ApiSandboxService {
    constructor(
        public router: Router,
        private snackBar: MatSnackBar,
        private appStateStore: Store<AppState>,
        private apiStateStore: Store<ApiState>,
        private http: HttpClient
    ) {}

    static transformDate(date: Date) {
        return moment(date).format("YYYY-MM-DD");
    }

    getUser() {
        return this.apiStateStore.pipe(select((state: any) => state.api.user));
    }

    patchUser(user: FullUser) {
        let userFromStore: FullUser = null;
        this.apiStateStore
            .pipe(select((state: any) => state.api.user))
            .pipe(take(1))
            .subscribe((loadedUser: FullUser) => {
                userFromStore = loadedUser;
            });
        const id = userFromStore.id;
        this.apiStateStore.dispatch(
            new StartPatchUser({
                id,
                userUpdates: userFromStore.getUpdates(user)
            })
        );
    }

    registerUser(user: any) {
        this.apiStateStore.dispatch(new StartCreateUser(user));
    }

    getAllRlcs() {
        return this.http.get(RLCS_URL);
    }

    startLoadingOtherUsers() {
        this.apiStateStore.dispatch(new StartLoadingOtherUsers());
    }
    getOtherUsers() {
        return this.apiStateStore.pipe(
            select((state: any) => state.api.other_users)
        );
    }

    showSuccessSnackBar(message: string) {
        const config = new MatSnackBarConfig();
        config.panelClass = ["snackbar__success"];
        config.duration = 2500;
        config.verticalPosition = "top";
        this.snackBar.open(message, "", config);
    }

    showErrorSnackBar(message: string) {
        const config = new MatSnackBarConfig();
        config.panelClass = ["snackbar__error"];
        config.duration = 2500;
        config.verticalPosition = "top";
        this.snackBar.open(message, "", config);
    }

    uploadProfilePicture(file: File) {
        console.log("started", file);
        const url = `api/storage_up/?file_name=${file.name}&file_type=${
            file.type
        }`;
        console.log(url);
        this.http.get(url).subscribe((response: any) => {
            console.log("response", response);
            this.uploadFile(file, response.data, response.url);
        });
    }

    uploadFile(file: File, s3Data: { url: string; fields: any }, url: string) {
        console.log("s3Data44", s3Data.fields);
        console.log("url", s3Data.url);

        const v4form = new FormData();
        // v4form.append('SignedHeader', 'host;range;x-amz-date');
        v4form.append("x-amz-credential", s3Data.fields["x-amz-credential"]);
        v4form.append("x-amz-algorithm", s3Data.fields["x-amz-algorithm"]);
        v4form.append("key", s3Data.fields["key"]);
        v4form.append("x-amz-signature", s3Data.fields["x-amz-signature"]);
        v4form.append("policy", s3Data.fields["policy"]);
        v4form.append("x-amz-date", s3Data.fields["x-amz-date"]);
        v4form.append("file", file);

        //console.log('form', form);
        console.log("form", v4form);
        this.http.post(s3Data.url, v4form).subscribe(response => {
            console.log("posting response:", response);
        });
    }

    downloadSingleFile(componentRef) {
        const url = `api/storage_down/`;
        this.http.get(url).subscribe((response: any) => {
            console.log("response from download", response);
            window.location.href = response.data;
        });
    }
}
