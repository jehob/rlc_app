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

import { Action } from "@ngrx/store";
import { ForeignUser, FullUser, RestrictedUser } from "../models/user.model";
import { HasPermission, Permission } from "../models/permission.model";
import { RestrictedRlc } from "../models/rlc.model";
import { FullGroup, RestrictedGroup } from "../models/group.model";
import { NewUserRequest } from "../models/new_user_request.model";

export const ADD_GROUP = "ADD_GROUP";
export const ADD_SINGLE_HAS_PERMISSION = "ADD_SINGLE_HAS_PERMISSION";
export const REMOVE_ACTUAL_HAS_PERMISSIONS = "REMOVE_ACTUAL_HAS_PERMISSIONS";
export const REMOVE_SINGLE_HAS_PERMISSION = "REMOVE_SINGLE_HAS_PERMISSION";
export const RESET_SPECIAL_FOREIGN_USER = "RESET_SPECIAL_FOREIGN_USER";
export const RESET_SPECIAL_GROUP = "RESET_SPECIAL_GROUP";
export const RESET_SPECIAL_GROUP_HAS_PERMISSIONS =
    "RESET_SPECIAL_GROUP_HAS_PERMISSIONS";
export const RESET_SPECIAL_PERMISSION = "RESET_SPECIAL_PERMISSION";
export const SET_ACTUAL_HAS_PERMISSIONS = "SET_ACTUAL_HAS_PERMISSIONS";
export const SET_ALL_PERMISSIONS = "SET_ALL_PERMISSIONS";
export const SET_GROUPS = "SET_GROUPS";
export const SET_NEW_USER_REQUESTS = "SET_NEW_USER_REQUESTS";
export const SET_OTHER_USERS = "SET_OTHER_USERS";
export const SET_RLC = "SET_RLC";
export const SET_RLCS = "SET_RLCS";
export const SET_SPECIAL_FOREIGN_USER = "SET_SPECIAL_FOREIGN_USER";
export const SET_SPECIAL_GROUP = "SET_SPECIAL_GROUP";
export const SET_SPECIAL_GROUP_HAS_PERMISSIONS =
    "SET_SPECIAL_GROUP_HAS_PERMISSIONS";
export const SET_SPECIAL_PERMISSION = "SET_SPECIAL_PERMISSION";
export const SET_USER = "SET_USER";
export const SET_USER_PERMISSIONS = "SET_USER_PERMISSIONS";
export const SET_USER_RECORD_STATES = "SET_USER_RECORD_STATES";
export const SET_USER_STATES = "SET_USER_STATES";
export const START_ADDING_GROUP = "START_ADDING_GROUP";
export const START_ADDING_GROUP_MEMBER = "START_ADDING_GROUP_MEMBER";
export const START_ADDING_HAS_PERMISSION = "START_ADDING_HAS_PERMISSION";
export const START_ADMITTING_NEW_USER_REQUEST =
    "START_ADMITTING_NEW_USER_REQUEST";
export const START_CREATE_USER = "START_CREATE_USER";
export const START_DECLINING_NEW_USER_REQUEST =
    "START_DECLINING_NEW_USER_REQUEST";
export const START_LOADING_GROUPS = "START_LOADING_GROUPS";
export const START_LOADING_HAS_PERMISSION_STATICS =
    "START_LOADING_HAS_PERMISSION_STATICS";
export const START_LOADING_NEW_USER_REQUESTS =
    "START_LOADING_NEW_USER_REQUESTS";
export const START_LOADING_OTHER_USERS = "START_LOADING_OTHER_USERS";
export const START_LOADING_RLCS = "START_LOADING_RLCS";
export const START_LOADING_SPECIAL_FOREIGN_USER =
    "START_LOADING_SPECIAL_FOREIGN_USER";
export const START_LOADING_SPECIAL_GROUP = "START_LOADING_SPECIAL_GROUP";
export const START_LOADING_SPECIAL_GROUP_HAS_PERMISSIONS =
    "START_LOADING_SPECIAL_GROUP_HAS_PERMISSIONS";
export const START_LOADING_SPECIAL_PERMISSION =
    "START_LOADING_SPECIAL_PERMISSION";
export const START_PATCH_USER = "START_PATCH_USER";
export const START_REMOVING_GROUP_MEMBER = "START_REMOVING_GROUP_MEMBER";
export const START_REMOVING_HAS_PERMISSION = "START_REMOVING_HAS_PERMISSION";
export const UPDATE_NEW_USER_REQUEST = "UPDATE_NEW_USER_REQUEST";
export const START_CHECKING_USER_ACTIVATION_LINK =
    "START_CHECKING_USER_ACTIVATION_LINK";
export const START_ACTIVATING_USER = "START_ACTIVATING_USER";

export class AddGroup implements Action {
    readonly type = ADD_GROUP;

    constructor(public payload: RestrictedGroup) {}
}
export class AddSingleHasPermission implements Action {
    readonly type = ADD_SINGLE_HAS_PERMISSION;

    constructor(public payload: HasPermission) {}
}

export class RemoveActualHasPermissions implements Action {
    readonly type = REMOVE_ACTUAL_HAS_PERMISSIONS;
}

export class RemoveSingleHasPermission implements Action {
    readonly type = REMOVE_SINGLE_HAS_PERMISSION;

    constructor(public payload: string) {}
}

export class ResetSpecialForeignUser implements Action {
    readonly type = RESET_SPECIAL_FOREIGN_USER;
}

export class ResetSpecialGroup implements Action {
    readonly type = RESET_SPECIAL_GROUP;
}

export class ResetSpecialPermission implements Action {
    readonly type = RESET_SPECIAL_PERMISSION;
}

export class SetActualHasPermissions implements Action {
    readonly type = SET_ACTUAL_HAS_PERMISSIONS;

    constructor(public payload: HasPermission[]) {}
}

export class SetAllPermissions implements Action {
    readonly type = SET_ALL_PERMISSIONS;

    constructor(public payload: Permission[]) {}
}

export class SetGroups implements Action {
    readonly type = SET_GROUPS;

    constructor(public payload: RestrictedGroup[]) {}
}

export class SetNewUserRequests implements Action {
    readonly type = SET_NEW_USER_REQUESTS;

    constructor(public payload: NewUserRequest[]) {}
}
export class SetOtherUsers implements Action {
    readonly type = SET_OTHER_USERS;

    constructor(public payload: RestrictedUser[]) {}
}

export class SetRlc implements Action {
    readonly type = SET_RLC;

    constructor(public payload: RestrictedRlc) {}
}

export class SetRlcs implements Action {
    readonly type = SET_RLCS;

    constructor(public payload: RestrictedRlc[]) {}
}

export class SetSpecialForeignUser implements Action {
    readonly type = SET_SPECIAL_FOREIGN_USER;

    constructor(public payload: ForeignUser) {}
}

export class SetSpecialGroup implements Action {
    readonly type = SET_SPECIAL_GROUP;

    constructor(public payload: FullGroup) {}
}

export class SetSpecialPermission implements Action {
    readonly type = SET_SPECIAL_PERMISSION;

    constructor(public payload: Permission) {}
}

export class SetUser implements Action {
    readonly type = SET_USER;

    constructor(public payload: FullUser) {}
}

export class SetUserPermissions implements Action {
    readonly type = SET_USER_PERMISSIONS;

    constructor(public payload: HasPermission[]) {}
}

export class SetUserRecordStates implements Action {
    readonly type = SET_USER_RECORD_STATES;

    constructor(public payload: any) {}
}

export class SetUserStates implements Action {
    readonly type = SET_USER_STATES;

    constructor(public payload: any) {}
}

export class StartAddingGroup implements Action {
    readonly type = START_ADDING_GROUP;

    constructor(public payload: any) {}
}

export class StartAddingGroupMember implements Action {
    readonly type = START_ADDING_GROUP_MEMBER;

    constructor(public payload: { user_id: string; group_id: string }) {}
}

export class StartAddingHasPermission implements Action {
    readonly type = START_ADDING_HAS_PERMISSION;

    constructor(public payload: any) {}
}

export class StartAdmittingNewUserRequest implements Action {
    readonly type = START_ADMITTING_NEW_USER_REQUEST;

    constructor(public payload: NewUserRequest) {}
}

export class StartCreateUser implements Action {
    readonly type = START_CREATE_USER;

    constructor(public payload: any) {}
}

export class StartDecliningNewUserRequest implements Action {
    readonly type = START_DECLINING_NEW_USER_REQUEST;

    constructor(public payload: NewUserRequest) {}
}

export class UpdateNewUserRequest implements Action {
    readonly type = UPDATE_NEW_USER_REQUEST;

    constructor(public payload: NewUserRequest) {}
}

export class StartLoadingGroups implements Action {
    readonly type = START_LOADING_GROUPS;
}

export class StartLoadingHasPermissionStatics implements Action {
    readonly type = START_LOADING_HAS_PERMISSION_STATICS;
}

export class StartLoadingNewUserRequests implements Action {
    readonly type = START_LOADING_NEW_USER_REQUESTS;
}

export class StartLoadingOtherUsers implements Action {
    readonly type = START_LOADING_OTHER_USERS;
}

export class StartLoadingRlcs implements Action {
    readonly type = START_LOADING_RLCS;
}

export class StartLoadingSpecialForeignUser implements Action {
    readonly type = START_LOADING_SPECIAL_FOREIGN_USER;

    constructor(public payload: string) {}
}

export class StartLoadingSpecialGroup implements Action {
    readonly type = START_LOADING_SPECIAL_GROUP;

    constructor(public payload: string) {}
}

export class StartLoadingSpecialGroupHasPermissions implements Action {
    readonly type = START_LOADING_SPECIAL_GROUP_HAS_PERMISSIONS;

    constructor(public payload: string) {}
}

export class StartLoadingSpecialPermission implements Action {
    readonly type = START_LOADING_SPECIAL_PERMISSION;

    constructor(public payload: string) {}
}

export class StartPatchUser implements Action {
    readonly type = START_PATCH_USER;

    constructor(public payload: { id: string; userUpdates: any }) {}
}

export class StartRemovingGroupMember implements Action {
    readonly type = START_REMOVING_GROUP_MEMBER;

    constructor(public payload: { user_id: string; group_id: string }) {}
}

export class StartRemovingHasPermission implements Action {
    readonly type = START_REMOVING_HAS_PERMISSION;

    constructor(public payload: string) {}
}

export class StartCheckingUserActivationLink implements Action {
    readonly type = START_CHECKING_USER_ACTIVATION_LINK;

    constructor(public payload: string) {}
}

export class StartActivatingUser implements Action {
    readonly type = START_ACTIVATING_USER;

    constructor(public payload: string) {}
}

export type ApiActions =
    | AddGroup
    | AddSingleHasPermission
    | RemoveActualHasPermissions
    | RemoveSingleHasPermission
    | ResetSpecialForeignUser
    | ResetSpecialGroup
    | ResetSpecialPermission
    | SetActualHasPermissions
    | SetAllPermissions
    | SetGroups
    | SetNewUserRequests
    | SetOtherUsers
    | SetRlc
    | SetRlcs
    | SetSpecialForeignUser
    | SetSpecialGroup
    | SetSpecialPermission
    | SetUser
    | SetUserPermissions
    | SetUserRecordStates
    | SetUserStates
    | StartActivatingUser
    | StartAddingGroup
    | StartAddingGroupMember
    | StartAddingHasPermission
    | StartAdmittingNewUserRequest
    | StartCheckingUserActivationLink
    | StartCreateUser
    | StartDecliningNewUserRequest
    | StartLoadingGroups
    | StartLoadingHasPermissionStatics
    | StartLoadingNewUserRequests
    | StartLoadingOtherUsers
    | StartLoadingRlcs
    | StartLoadingSpecialForeignUser
    | StartLoadingSpecialGroup
    | StartLoadingSpecialGroupHasPermissions
    | StartLoadingSpecialPermission
    | StartPatchUser
    | StartRemovingGroupMember
    | StartRemovingHasPermission
    | UpdateNewUserRequest;
