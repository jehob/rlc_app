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
import { Router } from "@angular/router";
import { take } from "rxjs/operators";
import moment from "moment";
import { HttpClient } from "@angular/common/http";
import { select, Store } from "@ngrx/store";

import { AppState } from "../../store/app.reducers";
import { ApiState } from "../store/api.reducers";
import { ForeignUser, FullUser, RestrictedUser } from "../models/user.model";
import {
    RemoveSingleHasPermission,
    ResetSpecialForeignUser,
    ResetSpecialGroup,
    ResetSpecialPermission,
    SetSpecialForeignUser,
    StartAddingGroupMember,
    StartAddingHasPermission,
    StartCreateUser,
    StartLoadingGroups,
    StartLoadingOtherUsers,
    StartLoadingRlcs,
    StartLoadingSpecialForeignUser,
    StartLoadingSpecialGroup,
    StartLoadingSpecialPermission,
    StartPatchUser,
    StartRemovingGroupMember,
    StartRemovingHasPermission
} from "../store/api.actions";
import { RLCS_URL } from "../../statics/api_urls.statics";
import { StorageService } from "../../shared/services/storage.service";
import { SnackbarService } from "../../shared/services/snackbar.service";
import { Observable } from "rxjs";
import {
    HasPermission,
    Permission,
    SpecialPermission
} from "../models/permission.model";
import { FullGroup, RestrictedGroup } from "../models/group.model";
import { RestrictedRlc } from "../models/rlc.model";

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

    getRlc(): Observable<RestrictedRlc> {
        return this.apiStateStore.pipe(select((state: any) => state.api.rlc));
    }

    getGroup(): Observable<FullGroup> {
        return this.apiStateStore.pipe(
            select((state: any) => state.api.special_group)
        );
    }

    getUserPermissions(
        asArray: boolean = true
    ): Observable<HasPermission[] | any> {
        return this.apiStateStore.pipe(
            select((state: any) => {
                const values = state.api.user_permissions;
                return asArray ? Object.values(values) : values;
            })
        );
    }

    getAllPermissions(asArray: boolean = true): Observable<Permission[] | any> {
        return this.apiStateStore.pipe(
            select((state: any) => {
                const values = state.api.all_permissions;
                return asArray ? Object.values(values) : values;
            })
        );
    }

    hasPermissionFromStringForOwnRlc(
        permission: string,
        subscriberCallback
    ): void {
        this.getRlc().subscribe((rlc: RestrictedRlc) => {
            if (rlc)
                this.hasPermissionFromString(permission, subscriberCallback, {
                    for_rlc: rlc.id
                });
        });
    }

    hasPermissionFromString(
        permission: string,
        subscriberCallback,
        permission_for: any = null
    ): void {
        /*
        checks if the user has permission and returns to subscriberCallback true or false
         */
        this.getAllPermissions()
            .subscribe((all_permissions: Permission[]) => {
                if (all_permissions.length > 0) {
                    try {
                        const id = Number(
                            all_permissions.filter(
                                single_permission =>
                                    single_permission.name === permission
                            )[0].id
                        );
                        this.hasPermissionFromId(
                            id,
                            subscriberCallback,
                            permission_for
                        );
                    } catch (e) {
                        subscriberCallback(false);
                    }
                }
            })
            .unsubscribe();
    }

    hasPermissionFromId(
        permission: number,
        subscriberCallback,
        permission_for: any = null
    ): void {
        /*
        checks if the user has permission and returns to subscriberCallback true or false
         */
        this.getUserPermissions()
            .subscribe((user_permissions: HasPermission[]) => {
                // const a: boolean = HasPermission.checkPermissionMet(user_permissions, permission, permission_for);
                subscriberCallback(
                    HasPermission.checkPermissionMet(
                        user_permissions,
                        permission,
                        permission_for
                    )
                );

                // const result: HasPermission[] = user_permissions.filter(
                //     (hasPermission: HasPermission) =>
                //         Number(hasPermission.permission_id) === permission
                // );
                // if (result.length === 0) {
                //     subscriberCallback(false);
                // } else {
                //     subscriberCallback(true);
                // }
            })
            .unsubscribe();
    }

    startPatchUser(user: FullUser) {
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

    getAllRlcs(asArray: boolean = true): Observable<RestrictedRlc[]> {
        //return this.http.get(RLCS_URL);
        return this.apiStateStore.pipe(
            select((state: any) => {
                const values = state.api.rlcs;
                return asArray ? Object.values(values) : values;
            })
        );
    }

    startLoadingOtherUsers() {
        this.apiStateStore.dispatch(new StartLoadingOtherUsers());
    }

    startLoadingGroups() {
        this.apiStateStore.dispatch(new StartLoadingGroups());
    }

    getGroups(asArray: boolean = true): Observable<RestrictedGroup[]> | any {
        return this.apiStateStore.pipe(
            select((state: any) => {
                const values = state.api.groups;
                return asArray ? Object.values(values) : values;
            })
        );
    }

    getOtherUsers(asArray: boolean = true): Observable<RestrictedUser[] | any> {
        return this.apiStateStore.pipe(
            select((state: any) => {
                const values = state.api.other_users;
                return asArray ? Object.values(values) : values;
            })
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

    relogUser() {
        this.router.navigate(["login"]);
    }

    setForeignUser(foreignUser: ForeignUser) {
        this.apiStateStore.dispatch(new SetSpecialForeignUser(foreignUser));
    }

    resetForeignUser() {
        this.apiStateStore.dispatch(new ResetSpecialForeignUser());
    }

    getSpecialForeignUser(): Observable<ForeignUser | any> {
        return this.apiStateStore.pipe(
            select((state: any) => state.api.foreign_user)
        );
    }

    loadAndGetSpecialForeignUser(id: string): Observable<ForeignUser | any> {
        this.apiStateStore.dispatch(new StartLoadingSpecialForeignUser(id));
        return this.getSpecialForeignUser();
    }

    startLoadingSpecialGroup(id: string): void {
        this.apiStateStore.dispatch(new StartLoadingSpecialGroup(id));
    }

    getSpecialGroup(): Observable<FullGroup> {
        return this.apiStateStore.pipe(
            select((state: any) => state.api.special_group)
        );
    }

    resetSpecialGroup(): void {
        return this.apiStateStore.dispatch(new ResetSpecialGroup());
    }

    addGroupMember(user_id: string, group_id: string): void {
        return this.apiStateStore.dispatch(
            new StartAddingGroupMember({ user_id, group_id })
        );
    }

    removeGroupMember(user_id: string, group_id: string): void {
        return this.apiStateStore.dispatch(
            new StartRemovingGroupMember({ user_id, group_id })
        );
    }

    startLoadingSpecialPermission(id: string): void {
        return this.apiStateStore.dispatch(
            new StartLoadingSpecialPermission(id)
        );
    }

    getSpecialPermission(): Observable<SpecialPermission> {
        return this.apiStateStore.pipe(
            select((state: any) => state.api.special_permission)
        );
    }

    resetSpecialPermission(): void {
        return this.apiStateStore.dispatch(new ResetSpecialPermission());
    }

    startLoadingRlcs(): void {
        return this.apiStateStore.dispatch(new StartLoadingRlcs());
    }

    startRemovingHasPermission(id: string): void {
        return this.apiStateStore.dispatch(new StartRemovingHasPermission(id));
    }

    startCreatingHasPermission(
        permissionId: string,
        userHas: RestrictedUser,
        groupHas: RestrictedGroup,
        rlcHas: RestrictedRlc,
        forUser: RestrictedUser,
        forGroup: RestrictedGroup,
        forRlc: RestrictedRlc
    ): void {
        const toAdd = {
            permission: permissionId,
            user_has_permission: userHas ? userHas.id : null,
            group_has_permission: groupHas ? groupHas.id : null,
            rlc_has_permission: rlcHas ? rlcHas.id : null,
            permission_for_user: forUser ? forUser.id : null,
            permission_for_group: forGroup ? forGroup.id : null,
            permission_for_rlc: forRlc ? forRlc.id : null
        };

        return this.apiStateStore.dispatch(new StartAddingHasPermission(toAdd));
    }
}
