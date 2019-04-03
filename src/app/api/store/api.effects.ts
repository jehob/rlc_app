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
import { HttpClient } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
    START_CREATE_USER,
    StartCreateUser,
    START_PATCH_USER,
    StartPatchUser,
    SET_USER,
    START_LOADING_OTHER_USERS,
    SET_OTHER_USERS,
    StartLoadingSpecialForeignUser,
    START_LOADING_SPECIAL_FOREIGN_USER,
    SET_SPECIAL_FOREIGN_USER,
    START_LOADING_GROUPS,
    StartLoadingGroups,
    SET_GROUPS,
    START_LOADING_SPECIAL_GROUP,
    StartLoadingSpecialGroup,
    SET_SPECIAL_GROUP,
    START_ADDING_GROUP_MEMBER,
    StartAddingGroupMember,
    START_REMOVING_GROUP_MEMBER,
    StartRemovingGroupMember,
    START_LOADING_SPECIAL_PERMISSION,
    StartLoadingSpecialPermission,
    SET_SPECIAL_PERMISSION,
    START_LOADING_RLCS,
    SET_RLCS,
    START_REMOVING_HAS_PERMISSION,
    StartRemovingHasPermission,
    REMOVE_SINGLE_HAS_PERMISSION, START_ADDING_HAS_PERMISSION, StartAddingHasPermission, ADD_SINGLE_HAS_PERMISSION
} from './api.actions';
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { from, of } from "rxjs";
import {
    CREATE_PROFILE_URL,
    GetSpecialGroupURL,
    GetSpecialHasPermissionURL,
    GetSpecialPermissionURL,
    GetSpecialProfileURL,
    GROUP_MEMBER_URL,
    GROUPS_URL, HAS_PERMISSION_URL,
    PROFILES_URL,
    RLCS_URL
} from '../../statics/api_urls.statics';
import { ApiSandboxService } from "../services/api-sandbox.service";
import { ForeignUser, FullUser, RestrictedUser } from "../models/user.model";
import { SnackbarService } from "../../shared/services/snackbar.service";
import { FullGroup, RestrictedGroup } from "../models/group.model";
import {HasPermission, SpecialPermission} from '../models/permission.model';
import { RestrictedRlc } from "../models/rlc.model";

@Injectable()
export class ApiEffects {
    constructor(
        private actions: Actions,
        private http: HttpClient,
        private apiSB: ApiSandboxService,
        private snackbar: SnackbarService
    ) {}

    @Effect()
    startPatchUser = this.actions.pipe(
        ofType(START_PATCH_USER),
        map((action: StartPatchUser) => {
            //console.log("getPayload", action.payload);
            return action.payload;
        }),
        switchMap((updates: { id: string; userUpdates: any }) => {
            //console.log("userUpdates", updates.userUpdates);
            return from(
                this.http
                    .patch(
                        GetSpecialProfileURL(updates.id),
                        updates.userUpdates
                    )
                    .pipe(
                        catchError(error => {
                            if (error.status === 400) return of({ error: "1" });
                            else if (error.status === 500)
                                return of({ error: "2" });
                            return of({ error: "unknown" });
                        }),
                        mergeMap((response: any) => {
                            this.apiSB.showSuccessSnackBar(
                                "successfully saved"
                            );
                            return [
                                {
                                    type: SET_USER,
                                    payload: FullUser.getFullUserFromJson(
                                        response
                                    )
                                }
                            ];
                        })
                    )
            );
        })
    );

    @Effect()
    startCreateUser = this.actions.pipe(
        ofType(START_CREATE_USER),
        map((action: StartCreateUser) => {
            return action.payload;
        }),
        switchMap((user: any) => {
            console.log("user start create");
            return from(
                this.http.post(CREATE_PROFILE_URL, user).pipe(
                    catchError(error => {
                        console.log("1");
                        console.log(error);
                        this.snackbar.showErrorSnackBar("error at register");
                        return [];
                    }),
                    mergeMap((response: any) => {
                        console.log("2");

                        if (!response.error) {
                            this.apiSB.showSuccessSnackBar(
                                "successfully created account"
                            );
                            this.apiSB.router.navigate(["login"]);
                        }
                        return [];
                    })
                )
            );
        })
    );

    @Effect()
    startLoadingGroups = this.actions.pipe(
        ofType(START_LOADING_GROUPS),
        switchMap(() => {
            return from(
                this.http.get(GROUPS_URL).pipe(
                    catchError(error => {
                        this.snackbar.showErrorSnackBar(
                            "error at loading groups: " + error.error.detail
                        );
                        return [];
                    }),
                    mergeMap((response: any) => {
                        const groups = RestrictedGroup.getRestrictedGroupsFromJsonArray(
                            response
                        );
                        return [
                            {
                                type: SET_GROUPS,
                                payload: groups
                            }
                        ];
                    })
                )
            );
        })
    );

    @Effect()
    startLoadingOtherUsers = this.actions.pipe(
        ofType(START_LOADING_OTHER_USERS),
        switchMap(() => {
            return from(
                this.http.get(PROFILES_URL).pipe(
                    catchError(error => {
                        this.snackbar.showErrorSnackBar(
                            "error at loading profiles: " + error.error.detail
                        );
                        return [];
                    }),
                    mergeMap((response: any) => {
                        //console.log(response);
                        const users = RestrictedUser.getRestrictedUsersFromJsonArray(
                            response
                        );
                        return [{ type: SET_OTHER_USERS, payload: users }];
                    })
                )
            );
        })
    );

    @Effect()
    startLoadingSpecialForeignUser = this.actions.pipe(
        ofType(START_LOADING_SPECIAL_FOREIGN_USER),
        map((action: StartLoadingSpecialForeignUser) => {
            return action.payload;
        }),
        switchMap((id: string) => {
            console.log("load special user start");
            return from(
                this.http.get(GetSpecialProfileURL(id)).pipe(
                    catchError(error => {
                        console.log(error);
                        this.snackbar.showErrorSnackBar(
                            "error at loading user"
                        );
                        return [];
                    }),
                    mergeMap((response: any) => {
                        if (!response.error) {
                            const user = ForeignUser.getForeignUserFromJson(
                                response
                            );
                            return [
                                {
                                    type: SET_SPECIAL_FOREIGN_USER,
                                    payload: user
                                }
                            ];
                        }
                        return [];
                    })
                )
            );
        })
    );

    @Effect()
    startLoadingSpecialGroup = this.actions.pipe(
        ofType(START_LOADING_SPECIAL_GROUP),
        map((action: StartLoadingSpecialGroup) => {
            return action.payload;
        }),
        switchMap((id: string) => {
            return from(
                this.http.get(GetSpecialGroupURL(id)).pipe(
                    catchError(error => {
                        this.snackbar.showErrorSnackBar(
                            "error at loading special group: " +
                                error.error.detail
                        );
                        return [];
                    }),
                    mergeMap((response: any) => {
                        const group = FullGroup.getFullGroupFromJson(response);
                        return [
                            {
                                type: SET_SPECIAL_GROUP,
                                payload: group
                            }
                        ];
                    })
                )
            );
        })
    );

    @Effect()
    startAddingGroupMember = this.actions.pipe(
        ofType(START_ADDING_GROUP_MEMBER),
        map((action: StartAddingGroupMember) => {
            return action.payload;
        }),
        switchMap((toAdd: { user_id: string; group_id: string }) => {
            return from(
                this.http
                    .post(GROUP_MEMBER_URL, {
                        action: "add",
                        user_id: toAdd.user_id,
                        group_id: toAdd.group_id
                    })
                    .pipe(
                        catchError(error => {
                            this.snackbar.showErrorSnackBar(
                                "error at adding group member: " +
                                    error.error.detail
                            );
                            return [];
                        }),
                        mergeMap((response: any) => {
                            const group = FullGroup.getFullGroupFromJson(
                                response
                            );
                            return [
                                {
                                    type: SET_SPECIAL_GROUP,
                                    payload: group
                                }
                            ];
                        })
                    )
            );
        })
    );

    @Effect()
    startRemovingGroupMember = this.actions.pipe(
        ofType(START_REMOVING_GROUP_MEMBER),
        map((action: StartRemovingGroupMember) => {
            return action.payload;
        }),
        switchMap((toAdd: { user_id: string; group_id: string }) => {
            return from(
                this.http
                    .post(GROUP_MEMBER_URL, {
                        action: "remove",
                        user_id: toAdd.user_id,
                        group_id: toAdd.group_id
                    })
                    .pipe(
                        catchError(error => {
                            this.snackbar.showErrorSnackBar(
                                "error at removing group member: " +
                                    error.error.detail
                            );
                            return [];
                        }),
                        mergeMap((response: any) => {
                            const group = FullGroup.getFullGroupFromJson(
                                response
                            );
                            return [
                                {
                                    type: SET_SPECIAL_GROUP,
                                    payload: group
                                }
                            ];
                        })
                    )
            );
        })
    );

    @Effect()
    startLoadingSpecialPermission = this.actions.pipe(
        ofType(START_LOADING_SPECIAL_PERMISSION),
        map((action: StartLoadingSpecialPermission) => {
            return action.payload;
        }),
        switchMap((id: string) => {
            return from(
                this.http.get(GetSpecialPermissionURL(id)).pipe(
                    catchError(error => {
                        this.snackbar.showErrorSnackBar(
                            "error at loading special permission: " +
                                error.error.detail
                        );
                        return [];
                    }),
                    mergeMap((response: any) => {
                        const special_permission = SpecialPermission.getSpecialPermissionFromJson(
                            response
                        );
                        return [
                            {
                                type: SET_SPECIAL_PERMISSION,
                                payload: special_permission
                            }
                        ];
                    })
                )
            );
        })
    );

    @Effect()
    startLoadingRlcs = this.actions.pipe(
        ofType(START_LOADING_RLCS),
        switchMap(() => {
            return from(
                this.http.get(RLCS_URL).pipe(
                    catchError(error => {
                        this.snackbar.showErrorSnackBar(
                            "error at loading rlcs: " + error.error.detail
                        );
                        return [];
                    }),
                    mergeMap((response: any) => {
                        const rlcs = RestrictedRlc.getRestrictedRlcsFromJsonArray(
                            response
                        );
                        return [
                            {
                                type: SET_RLCS,
                                payload: rlcs
                            }
                        ];
                    })
                )
            );
        })
    );

    @Effect()
    startRemovingHasPermission = this.actions.pipe(
        ofType(START_REMOVING_HAS_PERMISSION),
        map((action: StartRemovingHasPermission) => {
            return action.payload;
        }),
        switchMap((id: string) => {
            return from(
                this.http.delete(GetSpecialHasPermissionURL(id)).pipe(
                    catchError(error => {
                        this.snackbar.showErrorSnackBar(
                            "error at deleting hasPermission: " +
                                error.error.detail
                        );
                        return [];
                    }),
                    mergeMap((response: any) => {
                        console.log("response: ", response);
                        return [
                            {
                                type: REMOVE_SINGLE_HAS_PERMISSION,
                                payload: id
                            }
                        ];
                    })
                )
            );
        })
    );

    @Effect()
    startAddingHasPermission = this.actions.pipe(
        ofType(START_ADDING_HAS_PERMISSION),
        map((action: StartAddingHasPermission) => {
            return action.payload;
        }),
        switchMap((toAdd: any) => {
            return from(
                this.http.post(HAS_PERMISSION_URL, toAdd).pipe(
                    catchError(error => {
                        this.snackbar.showErrorSnackBar(
                            "error at creating hasPermission: " +
                            error.error.detail
                        );
                        return [];
                    }),
                    mergeMap((response: any) => {
                        console.log("response from creating hasPermission: ", response);
                        const hasPermission = HasPermission.getHasPermissionFromJson(response);
                        return [
                            {
                                type: ADD_SINGLE_HAS_PERMISSION,
                                payload: hasPermission
                            }
                        ];
                    })
                )
            );
        })
    );
}
