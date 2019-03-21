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
import {ForeignUser, FullUser, RestrictedUser} from '../models/user.model';
import {HasPermission, Permission} from '../models/permission.model';
import {RestrictedRlc} from '../models/rlc.model';
import {FullGroup, RestrictedGroup} from '../models/group.model';

export const SET_USER = "SET_USER";
export const SET_OTHER_USERS = "SET_OTHER_USERS";
export const SET_SPECIAL_FOREIGN_USER = "SET_SPECIAL_FOREIGN_USER";
export const SET_ALL_PERMISSIONS = "SET_ALL_PERMISSIONS";
export const SET_USER_PERMISSIONS = "SET_USER_PERMISSIONS";
export const SET_RLC = "SET_RLC";
export const SET_USER_STATES = "SET_USER_STATES";
export const SET_USER_RECORD_STATES = "SET_USER_RECORD_STATES";
export const SET_GROUPS = "SET_GROUPS";
export const SET_SPECIAL_GROUP = "SET_SPECIAL_GROUP";

export const RESET_SPECIAL_GROUP = "RESET_SPECIAL_GROUP";
export const RESET_SPECIAL_FOREIGN_USER = "RESET_SPECIAL_FOREIGN_USER";

export const START_PATCH_USER = "START_PATCH_USER";
export const START_CREATE_USER = "START_CREATE_USER";
export const START_LOADING_OTHER_USERS = "START_LOADING_OTHER_USERS";
export const START_LOADING_GROUPS = "START_LOADING_GROUPS";
export const START_LOADING_SPECIAL_FOREIGN_USER = "START_LOADING_SPECIAL_FOREIGN_USER";
export const START_LOADING_SPECIAL_GROUP = "START_LOADING_SPECIAL_GROUP";
export const START_ADDING_GROUP_MEMBER = "START_ADDING_GROUP_MEMBER";
export const START_REMOVING_GROUP_MEMBER = "START_REMOVING_GROUP_MEMBER";


export class SetUser implements Action {
    readonly type = SET_USER;

    constructor(public payload: FullUser) {}
}

export class SetSpecialForeignUser implements Action {
    readonly type = SET_SPECIAL_FOREIGN_USER;

    constructor(public payload: ForeignUser){}
}

export class SetAllPermissions implements Action{
    readonly type = SET_ALL_PERMISSIONS;

    constructor(public payload: Permission[]){}
}

export class SetUserPermissions implements Action {
    readonly type = SET_USER_PERMISSIONS;

    constructor(public payload: HasPermission[]){}
}

export class SetOtherUsers implements Action {
    readonly type = SET_OTHER_USERS;

    constructor(public payload: RestrictedUser[]) {}
}

export class StartPatchUser implements Action {
    readonly type = START_PATCH_USER;

    constructor(public payload: { id: string; userUpdates: any }) {}
}

export class StartCreateUser implements Action {
    readonly type = START_CREATE_USER;

    constructor(public payload: any) {}
}

export class StartLoadingOtherUsers implements Action {
    readonly type = START_LOADING_OTHER_USERS;
}

export class SetRlc implements Action {
    readonly type = SET_RLC;

    constructor(public payload: RestrictedRlc) {}
}

export class StartLoadingSpecialForeignUser implements Action {
    readonly type = START_LOADING_SPECIAL_FOREIGN_USER;

    constructor(public payload: string){}
}

export class SetUserStates implements Action {
    readonly type = SET_USER_STATES;

    constructor(public payload: any){}
}

export class SetUserRecordStates implements Action {
    readonly type = SET_USER_RECORD_STATES;

    constructor(public payload: any){}
}

export class StartLoadingGroups implements  Action {
    readonly type = START_LOADING_GROUPS;
}

export class SetGroups implements Action {
    readonly type = SET_GROUPS;

    constructor(public payload: RestrictedGroup[]){}
}

export class ResetSpecialForeignUser implements Action {
    readonly type = RESET_SPECIAL_FOREIGN_USER;
}

export class SetSpecialGroup implements Action {
    readonly type = SET_SPECIAL_GROUP;

    constructor(public payload: FullGroup){}
}

export class ResetSpecialGroup implements Action {
    readonly type = RESET_SPECIAL_GROUP;
}

export class StartLoadingSpecialGroup implements Action {
    readonly type = START_LOADING_SPECIAL_GROUP;

    constructor(public payload: string){}
}

export class StartAddingGroupMember implements Action {
    readonly type = START_ADDING_GROUP_MEMBER;

    constructor(public payload: {user_id: string, group_id: string }){}
}

export class StartRemovingGroupMember implements Action {
    readonly type = START_REMOVING_GROUP_MEMBER;

    constructor(public payload: {user_id: string, group_id: string }){}
}

export type ApiActions =
    | SetUser
    | SetAllPermissions
    | SetUserPermissions
    | SetSpecialForeignUser
    | SetOtherUsers
    | StartPatchUser
    | StartCreateUser
    | StartLoadingOtherUsers
    | StartLoadingSpecialForeignUser
    | SetRlc
    | SetUserStates
    | SetUserRecordStates
    | StartLoadingGroups
    | SetGroups
    | ResetSpecialForeignUser
    | SetSpecialGroup
    | ResetSpecialGroup
    | StartLoadingSpecialGroup
    | StartAddingGroupMember
    | StartRemovingGroupMember;
