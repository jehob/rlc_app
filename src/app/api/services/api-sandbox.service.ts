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
import { take } from "rxjs/operators";
import moment from "moment";
import { HttpClient } from "@angular/common/http";
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
import { StorageService } from "../../shared/services/storage.service";
import { SnackbarService } from "../../shared/services/snackbar.service";
import { Observable } from "rxjs";
import { HasPermission, Permission } from "../models/permission.model";

@Injectable()
export class ApiSandboxService {
    constructor(
        public router: Router,
        private snackbarService: SnackbarService,
        private appStateStore: Store<AppState>,
        private apiStateStore: Store<ApiState>,
        private storageService: StorageService,
        private http: HttpClient
    ) {}

    static transformDate(date: Date) {
        return moment(date).format("YYYY-MM-DD");
    }

    getUser(): Observable<FullUser> {
        return this.apiStateStore.pipe(select((state: any) => state.api.user));
    }

    getUserPermissions(): Observable<HasPermission[]> {
        return this.apiStateStore.pipe(
            select((state: any) => state.api.user_permissions)
        );
    }

    hasPermissionFromString(permission: string, subscriberCallback): void {
        this.apiStateStore
            .pipe(select((state: any) => state.api.all_permissions))
            .subscribe((all_permissions: Permission[]) => {
                if (all_permissions.length > 0) {
                    const id = Number(
                        all_permissions.filter(
                            single_permission =>
                                single_permission.name === permission
                        )[0].id
                    );
                    this.hasPermissionFromId(id, subscriberCallback);
                }
            });
    }

    hasPermissionFromId(permission: number, subscriberCallback): void {
        this.apiStateStore
            .pipe(select((state: any) => state.api.user_permissions))
            .subscribe((user_permissions: HasPermission[]) => {
                const result = user_permissions.filter(
                    (hasPermission: HasPermission) =>
                        Number(hasPermission.permission_id) === permission
                );
                console.log(result);
                if (result.length === 0) {
                    subscriberCallback(false);
                } else {
                    subscriberCallback(true);
                }
            });
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
        this.snackbarService.showSuccessSnackBar(message);
    }

    showErrorSnackBar(message: string) {
        this.snackbarService.showErrorSnackBar(message);
    }

    uploadProfilePicture(file: File) {
        this.storageService.uploadFile(file, "profile_pictures");
    }

    downloadSingleFile(filekey: string) {
        this.storageService.downloadFile(filekey);
    }
}
