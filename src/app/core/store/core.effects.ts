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
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { from, of } from "rxjs";

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
    REMOVE_SINGLE_HAS_PERMISSION,
    START_ADDING_HAS_PERMISSION,
    StartAddingHasPermission,
    ADD_SINGLE_HAS_PERMISSION,
    START_LOADING_SPECIAL_GROUP_HAS_PERMISSIONS,
    StartLoadingSpecialGroupHasPermissions,
    START_LOADING_HAS_PERMISSION_STATICS,
    SET_ACTUAL_HAS_PERMISSIONS,
    START_ADDING_GROUP,
    StartAddingGroup,
    ADD_GROUP,
    START_LOADING_NEW_USER_REQUESTS,
    SET_NEW_USER_REQUESTS,
    START_ADMITTING_NEW_USER_REQUEST,
    StartAdmittingNewUserRequest,
    START_DECLINING_NEW_USER_REQUEST,
    StartDecliningNewUserRequest,
    UPDATE_NEW_USER_REQUEST,
    START_CHECKING_USER_ACTIVATION_LINK,
    StartCheckingUserActivationLink,
    START_ACCEPTING_USER,
    StartAcceptingUser,
    START_SAVING_USER,
    StartSavingUser,
    START_LOADING_INACTIVE_USERS,
    SET_INACTIVE_USERS,
    START_ACTIVATING_INACTIVE_USER,
    StartActivatingInactiveUser,
    REMOVE_INACTIVE_USER,
    START_CHECKING_USER_HAS_PERMISSIONS,
    SET_USER_PERMISSIONS
} from "./core.actions";
import {
    CREATE_PROFILE_API_URL,
    GetActivateUserApiUrl,
    GetCheckUserActivationApiUrl,
    GetPermissionsForGroupApiURL,
    GetSpecialGroupApiURL,
    GetSpecialHasPermissionApiURL,
    GetSpecialPermissionApiURL,
    GetSpecialProfileApiURL,
    GROUP_MEMBER_API_URL,
    GROUPS_API_URL,
    HAS_PERMISSION_API_URL,
    HAS_PERMISSIONS_STATICS_API_URL,
    INACTIVE_USERS_API_URL,
    NEW_USER_REQUEST_ADMIT_API_URL,
    NEW_USER_REQUEST_API_URL,
    PROFILES_API_URL,
    RLCS_API_URL,
    USER_HAS_PERMISSIONS_API_URL
} from "../../statics/api_urls.statics";
import { CoreSandboxService } from "../services/core-sandbox.service";
import { ForeignUser, FullUser, RestrictedUser } from "../models/user.model";
import { SnackbarService } from "../../shared/services/snackbar.service";
import { FullGroup, RestrictedGroup } from "../models/group.model";
import { HasPermission, Permission } from "../models/permission.model";
import { RestrictedRlc } from "../models/rlc.model";
import { NewUserRequest } from "../models/new_user_request.model";

@Injectable()
export class CoreEffects {
    constructor(
        private actions: Actions,
        private http: HttpClient,
        private coreSB: CoreSandboxService,
        private snackbar: SnackbarService
    ) {}

    @Effect()
    startPatchUser = this.actions.pipe(
        ofType(START_PATCH_USER),
        map((action: StartPatchUser) => {
            return action.payload;
        }),
        switchMap((updates: { id: string; userUpdates: any }) => {
            return from(
                this.http
                    .patch(
                        GetSpecialProfileApiURL(updates.id),
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
                            this.coreSB.showSuccessSnackBar(
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
            return from(
                this.http.post(CREATE_PROFILE_API_URL, user).pipe(
                    catchError(error => {
                        this.snackbar.showErrorSnackBar(
                            "error at register: " + error.error.detail
                        );
                        return [];
                    }),
                    mergeMap((response: any) => {
                        if (!response.error) {
                            this.coreSB.showSuccessSnackBar(
                                "successfully created account"
                            );
                            this.coreSB.router.navigate(["login"]);
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
                this.http.get(GROUPS_API_URL).pipe(
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
                this.http.get(PROFILES_API_URL).pipe(
                    catchError(error => {
                        this.snackbar.showErrorSnackBar(
                            "error at loading profiles: " + error.error.detail
                        );
                        return [];
                    }),
                    mergeMap((response: any) => {
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
            return from(
                this.http.get(GetSpecialProfileApiURL(id)).pipe(
                    catchError(error => {
                        this.snackbar.showErrorSnackBar(
                            `error at loading user: ${error.error.detail}`
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
                this.http.get(GetSpecialGroupApiURL(id)).pipe(
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
                    .post(GROUP_MEMBER_API_URL, {
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
                    .post(GROUP_MEMBER_API_URL, {
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
                this.http.get(GetSpecialPermissionApiURL(id)).pipe(
                    catchError(error => {
                        this.snackbar.showErrorSnackBar(
                            "error at loading special permission: " +
                                error.error.detail
                        );
                        return [];
                    }),
                    mergeMap((response: any) => {
                        const permission = Permission.getPermissionFromJson(
                            response
                        );
                        const hasPermissions = HasPermission.getPermissionsFromJsonArray(
                            response.has_permissions
                        );
                        return [
                            {
                                type: SET_SPECIAL_PERMISSION,
                                payload: permission
                            },
                            {
                                type: SET_ACTUAL_HAS_PERMISSIONS,
                                payload: hasPermissions
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
                this.http.get(RLCS_API_URL).pipe(
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
                        if (rlcs.length === 0) {
                            this.snackbar.showErrorSnackBar(
                                "unfortunately there are no rlcs until now"
                            );
                        }
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
                this.http.delete(GetSpecialHasPermissionApiURL(id)).pipe(
                    catchError(error => {
                        this.snackbar.showErrorSnackBar(
                            "error at deleting hasPermission: " +
                                error.error.detail
                        );
                        return [];
                    }),
                    mergeMap((response: any) => {
                        return [
                            {
                                type: REMOVE_SINGLE_HAS_PERMISSION,
                                payload: id
                            },
                            {
                                type: START_CHECKING_USER_HAS_PERMISSIONS
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
                this.http.post(HAS_PERMISSION_API_URL, toAdd).pipe(
                    catchError(error => {
                        this.snackbar.showErrorSnackBar(
                            "error at creating hasPermission: " +
                                error.error.detail
                        );
                        return [];
                    }),
                    mergeMap((response: any) => {
                        const hasPermission = HasPermission.getHasPermissionFromJson(
                            response
                        );
                        return [
                            {
                                type: ADD_SINGLE_HAS_PERMISSION,
                                payload: hasPermission
                            },
                            {
                                type: START_CHECKING_USER_HAS_PERMISSIONS
                            }
                        ];
                    })
                )
            );
        })
    );

    @Effect()
    startLoadingSpecialGroupHasPermissions = this.actions.pipe(
        ofType(START_LOADING_SPECIAL_GROUP_HAS_PERMISSIONS),
        map((action: StartLoadingSpecialGroupHasPermissions) => {
            return action.payload;
        }),
        switchMap((id: string) => {
            return from(
                this.http.get(GetPermissionsForGroupApiURL(id)).pipe(
                    catchError(error => {
                        this.snackbar.showErrorSnackBar(
                            "error at loading special group has permissions: " +
                                error.error.detail
                        );
                        return [];
                    }),
                    mergeMap((response: any) => {
                        const hasPermissions: HasPermission[] = HasPermission.getPermissionsFromJsonArray(
                            response
                        );
                        return [
                            {
                                type: SET_ACTUAL_HAS_PERMISSIONS,
                                payload: hasPermissions
                            }
                        ];
                    })
                )
            );
        })
    );

    @Effect()
    startLoadingHasPermissionStatics = this.actions.pipe(
        ofType(START_LOADING_HAS_PERMISSION_STATICS),
        switchMap(() => {
            return from(
                this.http.get(HAS_PERMISSIONS_STATICS_API_URL).pipe(
                    catchError(error => {
                        this.snackbar.showErrorSnackBar(
                            "error at loading hasPermission statics: " +
                                error.error.detail
                        );
                        return [];
                    }),
                    mergeMap((response: any) => {
                        const otherUsers = RestrictedUser.getRestrictedUsersFromJsonArray(
                            response.users
                        );
                        const groups = RestrictedGroup.getRestrictedGroupsFromJsonArray(
                            response.groups
                        );
                        return [
                            {
                                type: SET_OTHER_USERS,
                                payload: otherUsers
                            },
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
    startAddingGroup = this.actions.pipe(
        ofType(START_ADDING_GROUP),
        map((action: StartAddingGroup) => {
            return action.payload;
        }),
        switchMap((newGroup: { name: string; visible: boolean }) => {
            return from(
                this.http.post(GROUPS_API_URL, newGroup).pipe(
                    catchError(error => {
                        this.snackbar.showErrorSnackBar(
                            "error at adding new group: " + error.error.detail
                        );
                        return [];
                    }),
                    mergeMap((response: any) => {
                        const group = RestrictedGroup.getRestrictedUserFromJson(
                            response
                        );
                        return [
                            {
                                type: ADD_GROUP,
                                payload: group
                            }
                        ];
                    })
                )
            );
        })
    );

    @Effect()
    startLoadingNewUserRequests = this.actions.pipe(
        ofType(START_LOADING_NEW_USER_REQUESTS),
        switchMap(() => {
            return from(
                this.http.get(NEW_USER_REQUEST_API_URL).pipe(
                    catchError(error => {
                        this.snackbar.showErrorSnackBar(
                            "error at loading new user requests: " +
                                error.error.detail
                        );
                        return [];
                    }),
                    mergeMap((response: any) => {
                        const requests = NewUserRequest.getNewUserRequestFromJsonArray(
                            response
                        );
                        return [
                            {
                                type: SET_NEW_USER_REQUESTS,
                                payload: requests
                            }
                        ];
                    })
                )
            );
        })
    );

    @Effect()
    startAdmittingNewUserRequest = this.actions.pipe(
        ofType(START_ADMITTING_NEW_USER_REQUEST),
        map((action: StartAdmittingNewUserRequest) => {
            return action.payload;
        }),
        switchMap((newUserRequest: NewUserRequest) => {
            return from(
                this.http
                    .post(NEW_USER_REQUEST_ADMIT_API_URL, {
                        id: newUserRequest.id,
                        action: "accept"
                    })
                    .pipe(
                        catchError(error => {
                            this.snackbar.showErrorSnackBar(
                                "error at accepting new user request: " +
                                    error.error.detail
                            );
                            return [];
                        }),
                        mergeMap((response: any) => {
                            const request = NewUserRequest.getNewUserRequestFromJson(
                                response
                            );
                            return [
                                {
                                    type: UPDATE_NEW_USER_REQUEST,
                                    payload: request
                                }
                            ];
                        })
                    )
            );
        })
    );

    @Effect()
    startDecliningNewUserRequest = this.actions.pipe(
        ofType(START_DECLINING_NEW_USER_REQUEST),
        map((action: StartDecliningNewUserRequest) => {
            return action.payload;
        }),
        switchMap((newUserRequest: NewUserRequest) => {
            return from(
                this.http
                    .post(NEW_USER_REQUEST_ADMIT_API_URL, {
                        id: newUserRequest.id,
                        action: "decline"
                    })
                    .pipe(
                        catchError(error => {
                            this.snackbar.showErrorSnackBar(
                                "error at accepting new user request: " +
                                    error.error.detail
                            );
                            return [];
                        }),
                        mergeMap((response: any) => {
                            const request = NewUserRequest.getNewUserRequestFromJson(
                                response
                            );
                            return [
                                {
                                    type: UPDATE_NEW_USER_REQUEST,
                                    payload: request
                                }
                            ];
                        })
                    )
            );
        })
    );

    @Effect()
    startCheckingUserActivationLink = this.actions.pipe(
        ofType(START_CHECKING_USER_ACTIVATION_LINK),
        map((action: StartCheckingUserActivationLink) => {
            return action.payload;
        }),
        switchMap((link: string) => {
            return from(
                this.http.get(GetCheckUserActivationApiUrl(link)).pipe(
                    catchError(error => {
                        this.snackbar.showErrorSnackBar(
                            "error at checking user activation link: " +
                                error.error.detail
                        );
                        return [];
                    }),
                    mergeMap((response: any) => {
                        return [];
                    })
                )
            );
        })
    );

    @Effect()
    startAcceptingUser = this.actions.pipe(
        ofType(START_ACCEPTING_USER),
        map((action: StartAcceptingUser) => {
            return action.payload;
        }),
        switchMap((link: string) => {
            return from(
                this.http.post(GetActivateUserApiUrl(link), {}).pipe(
                    catchError(error => {
                        this.snackbar.showErrorSnackBar(
                            "error at checking user activation link: " +
                                error.error.detail
                        );
                        return [];
                    }),
                    mergeMap((response: any) => {
                        this.snackbar.showSuccessSnackBar(
                            "account successfully activated"
                        );
                        return [];
                    })
                )
            );
        })
    );

    @Effect()
    startSavingUser = this.actions.pipe(
        ofType(START_SAVING_USER),
        map((action: StartSavingUser) => {
            return action.payload;
        }),
        switchMap((user: FullUser) => {
            return from(
                this.http.patch(GetSpecialProfileApiURL(user.id), user).pipe(
                    catchError(error => {
                        this.snackbar.showErrorSnackBar(
                            "error at saving user: " + error.error.detail
                        );
                        return [];
                    }),
                    mergeMap((response: any) => {
                        this.snackbar.showSuccessSnackBar(
                            "successfully saved profile"
                        );
                        return [];
                    })
                )
            );
        })
    );

    @Effect()
    startLoadingInactiveUsers = this.actions.pipe(
        ofType(START_LOADING_INACTIVE_USERS),
        switchMap(() => {
            return from(
                this.http.get(INACTIVE_USERS_API_URL).pipe(
                    catchError(error => {
                        this.snackbar.showErrorSnackBar(
                            "error at loading inactive users: " +
                                error.error.detail
                        );
                        return [];
                    }),
                    mergeMap((response: any) => {
                        const inactive_users = FullUser.getFullUsersFromJsonArray(
                            response
                        );
                        return [
                            {
                                type: SET_INACTIVE_USERS,
                                payload: inactive_users
                            }
                        ];
                    })
                )
            );
        })
    );

    @Effect()
    startActivatingInactiveUser = this.actions.pipe(
        ofType(START_ACTIVATING_INACTIVE_USER),
        map((action: StartActivatingInactiveUser) => {
            return action.payload;
        }),
        switchMap((id: string) => {
            return from(
                this.http
                    .post(INACTIVE_USERS_API_URL, {
                        method: "activate",
                        user_id: id
                    })
                    .pipe(
                        catchError(error => {
                            this.snackbar.showErrorSnackBar(
                                "error at activating inactive user: " +
                                    error.error.detail
                            );
                            return [];
                        }),
                        mergeMap((response: any) => {

                            return [
                                {
                                    type: REMOVE_INACTIVE_USER,
                                    payload: id
                                }
                            ];
                        })
                    )
            );
        })
    );

    @Effect()
    startCheckingUserHasPermissions = this.actions.pipe(
        ofType(START_CHECKING_USER_HAS_PERMISSIONS),
        switchMap(() => {
            return from(
                this.http.get(USER_HAS_PERMISSIONS_API_URL).pipe(
                    catchError(error => {
                        this.snackbar.showErrorSnackBar(
                            "error at checking user permissions: " +
                                error.error.detail
                        );
                        return [];
                    }),
                    mergeMap((response: any) => {
                        const user_permissions = HasPermission.getPermissionsFromJsonArray(
                            response.user_permissions
                        );
                        return [
                            {
                                type: SET_USER_PERMISSIONS,
                                payload: user_permissions
                            }
                        ];
                    })
                )
            );
        })
    );
}
