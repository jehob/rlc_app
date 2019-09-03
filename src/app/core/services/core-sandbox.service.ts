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
import { CoreState } from "../store/core.reducers";
import { ForeignUser, FullUser, RestrictedUser } from "../models/user.model";
import {
    RemoveActualHasPermissions,
    ResetSpecialForeignUser,
    ResetSpecialGroup,
    ResetSpecialPermission,
    SetSpecialForeignUser,
    StartAcceptingUser,
    StartActivatingInactiveUser,
    StartAddingGroup,
    StartAddingGroupMember,
    StartAddingHasPermission,
    StartAdmittingNewUserRequest,
    StartCheckingUserActivationLink,
    StartCheckingUserHasPermissions,
    StartCreateUser,
    StartDecliningNewUserRequest,
    StartLoadingGroups,
    StartLoadingHasPermissionStatics,
    StartLoadingInactiveUsers,
    StartLoadingNewUserRequests,
    StartLoadingOtherUsers,
    StartLoadingRlcs,
    StartLoadingSpecialForeignUser,
    StartLoadingSpecialGroup,
    StartLoadingSpecialGroupHasPermissions,
    StartLoadingSpecialPermission,
    StartPatchUser,
    StartRemovingGroupMember,
    StartRemovingHasPermission,
    StartSavingUser
} from "../store/core.actions";
import { StorageService } from "../../shared/services/storage.service";
import { SnackbarService } from "../../shared/services/snackbar.service";
import { Observable } from "rxjs";
import { HasPermission, Permission } from "../models/permission.model";
import { FullGroup, RestrictedGroup } from "../models/group.model";
import { RestrictedRlc } from "../models/rlc.model";
import { NewUserRequest } from "../models/new_user_request.model";
import { State } from "../models/state.model";

@Injectable()
export class CoreSandboxService {
    constructor(
        public router: Router,
        private snackbarService: SnackbarService,
        private appStateStore: Store<AppState>,
        private apiStateStore: Store<CoreState>,
        private storageService: StorageService
    ) {}

    static transformDateToString(date: Date | string): string {
        if (typeof date === "string")
            return moment(new Date(date)).format("YYYY-MM-DD");
        return moment(date).format("YYYY-MM-DD");
    }

    static transformDate(date: Date | string): Date {
        if (typeof date === "string")
            return new Date(moment(new Date(date)).format("YYYY-MM-DD"));
        else return new Date(moment(date).format("YYYY-MM-DD"));
    }

    getUser(): Observable<FullUser> {
        return this.apiStateStore.pipe(select((state: any) => state.core.user));
    }

    getRlc(): Observable<RestrictedRlc> {
        return this.apiStateStore.pipe(select((state: any) => state.core.rlc));
    }

    getGroup(): Observable<FullGroup> {
        return this.apiStateStore.pipe(
            select((state: any) => state.core.special_group)
        );
    }

    getUserPermissions(
        asArray: boolean = true
    ): Observable<HasPermission[] | any> {
        return this.apiStateStore.pipe(
            select((state: any) => {
                const values = state.core.user_permissions;
                return asArray ? Object.values(values) : values;
            })
        );
    }

    getAllPermissions(asArray: boolean = true): Observable<Permission[] | any> {
        return this.apiStateStore.pipe(
            select((state: any) => {
                const values = state.core.all_permissions;
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
        this.getAllPermissions().subscribe((all_permissions: Permission[]) => {
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
        });
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
                subscriberCallback(
                    HasPermission.checkPermissionMet(
                        user_permissions,
                        permission,
                        permission_for
                    )
                );
            })
            .unsubscribe();
    }

    startSavingUser(user: FullUser) {
        this.apiStateStore.dispatch(new StartSavingUser(user));
    }

    registerUser(user: any) {
        this.apiStateStore.dispatch(new StartCreateUser(user));
    }

    getAllRlcs(asArray: boolean = true): Observable<RestrictedRlc[]> {
        //return this.http.get(RLCS_API_URL);
        return this.apiStateStore.pipe(
            select((state: any) => {
                const values = state.core.rlcs;
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
                const values = state.core.groups;
                return asArray ? Object.values(values) : values;
            })
        );
    }

    getOtherUsers(asArray: boolean = true): Observable<RestrictedUser[] | any> {
        return this.apiStateStore.pipe(
            select((state: any) => {
                const values = state.core.other_users;
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
            select((state: any) => state.core.foreign_user)
        );
    }

    loadAndGetSpecialForeignUser(id: string): Observable<ForeignUser | any> {
        this.apiStateStore.dispatch(new StartLoadingSpecialForeignUser(id));
        return this.getSpecialForeignUser();
    }

    startLoadingSpecialGroup(id: string): void {
        this.apiStateStore.dispatch(new StartLoadingSpecialGroup(id));
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

    getSpecialPermission(): Observable<Permission> {
        return this.apiStateStore.pipe(
            select((state: any) => state.core.special_permission)
        );
    }

    resetSpecialPermission(): void {
        this.apiStateStore.dispatch(new ResetSpecialPermission());
        this.apiStateStore.dispatch(new RemoveActualHasPermissions());
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

    getOtherUserById(id: string): RestrictedUser {
        let user: RestrictedUser = null;
        this.apiStateStore
            .pipe(
                take(1),
                select((state: any) => state.core.other_users[id])
            )
            .subscribe(actualUser => (user = actualUser));
        return user;
    }

    getGroupById(id: string): RestrictedGroup {
        let group: RestrictedGroup = null;
        this.apiStateStore
            .pipe(
                take(1),
                select((state: any) => state.core.groups[id])
            )
            .subscribe(actualGroup => (group = actualGroup));
        return group;
    }

    getRlcById(id: string): RestrictedRlc {
        let rlc: RestrictedRlc = null;
        this.apiStateStore
            .pipe(
                take(1),
                select((state: any) => state.core.rlcs[id])
            )
            .subscribe(actualRlc => (rlc = actualRlc));
        return rlc;
    }

    getPermissionById(id: string): Permission {
        let permission: Permission = null;
        this.apiStateStore
            .pipe(
                take(1),
                select((state: any) => state.core.all_permissions[id])
            )
            .subscribe(actualPermission => (permission = actualPermission));
        return permission;
    }

    startLoadingGroupHasPermissions(group_id: string): void {
        this.apiStateStore.dispatch(
            new StartLoadingSpecialGroupHasPermissions(group_id)
        );
    }

    getActualHasPermissions(
        asArray: boolean = true
    ): Observable<HasPermission[]> | any {
        return this.apiStateStore.pipe(
            select((state: any) => {
                const values = state.core.actual_has_permissions;
                return asArray ? Object.values(values) : values;
            })
        );
    }

    startLoadingPermissionStatics(): void {
        this.apiStateStore.dispatch(new StartLoadingHasPermissionStatics());
    }

    startAddingGroup(newGroup: any): void {
        this.apiStateStore.dispatch(new StartAddingGroup(newGroup));
    }

    startLoadingNewUserRequests(): void {
        this.apiStateStore.dispatch(new StartLoadingNewUserRequests());
    }

    getNewUserRequests(
        asArray: boolean = true
    ): Observable<NewUserRequest[]> | any {
        return this.apiStateStore.pipe(
            select((state: any) => {
                const values = state.core.new_user_requests;
                return asArray ? Object.values(values) : values;
            })
        );
    }

    startAdmittingNewUserRequest(newUserRequest: NewUserRequest): void {
        this.apiStateStore.dispatch(
            new StartAdmittingNewUserRequest(newUserRequest)
        );
    }

    startDecliningNewUserRequest(newUserRequest: NewUserRequest): void {
        this.apiStateStore.dispatch(
            new StartDecliningNewUserRequest(newUserRequest)
        );
    }

    startCheckingUserActivationLink(link: string): void {
        this.apiStateStore.dispatch(new StartCheckingUserActivationLink(link));
    }

    startAcceptingUser(link: string): void {
        this.apiStateStore.dispatch(new StartAcceptingUser(link));
    }

    getUserStates(asArray: boolean = true): Observable<State[]> {
        return this.apiStateStore.pipe(
            select((state: any) => {
                const values = state.core.user_states;
                return asArray ? Object.values(values) : values;
            })
        );
    }

    getUserRecordStates(asArray: boolean = true): Observable<State[]> {
        return this.apiStateStore.pipe(
            select((state: any) => {
                const values = state.core.user_record_states;
                return asArray ? Object.values(values) : values;
            })
        );
    }

    getUserStateByAbbreviation(abb: string): Observable<State> {
        return this.apiStateStore.pipe(
            select((state: any) => state.core.user_states[abb])
        );
    }

    getUserRecordStateByAbbreviation(abb: string): Observable<State> {
        return this.apiStateStore.pipe(
            select((state: any) => state.core.user_record_states[abb])
        );
    }

    startLoadingInactiveUsers(): void {
        this.apiStateStore.dispatch(new StartLoadingInactiveUsers());
    }

    getInactiveUsers(asArray: boolean = true): Observable<FullUser[]> {
        return this.apiStateStore.pipe(
            select((state: any) => {
                const values = state.core.inactive_users;
                return asArray ? Object.values(values) : values;
            })
        );
    }

    startActivatingInactiveUser(user: FullUser): void {
        this.apiStateStore.dispatch(new StartActivatingInactiveUser(user.id));
    }

    startCheckingUserHasPermissions(): void {
        this.apiStateStore.dispatch(new StartCheckingUserHasPermissions());
    }
}
