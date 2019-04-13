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
export * from "./records-start.actions";
export * from "./records-set.actions";

import { RecordDocument } from "../../models/record_document.model";
import { RecordMessage } from "../../models/record_message.model";
import { RecordStartActions } from "./records-start.actions";
import { RecordsSetActions } from "./records-set.actions";
import {RecordPermissionRequest} from '../../models/record_permission.model';

export const RESET_FULL_CLIENT_INFORMATION = "RESET_FULL_CLIENT_INFORMATION";
export const RESET_POSSIBLE_CLIENTS = "RESET_POSSIBLE_CLIENTS";

export const ADD_RECORD_DOCUMENT = "ADD_RECORD_DOCUMENT";
export const ADD_RECORD_MESSAGE = "ADD_RECORD_MESSAGE";

export const UPDATE_RECORD_PERMISSION_REQUEST = "UPDATE_RECORD_PERMISSION_REQUEST";

export class AddRecordDocument implements Action {
    readonly type = ADD_RECORD_DOCUMENT;

    constructor(public payload: RecordDocument) {}
}

export class ResetPossibleClients implements Action {
    readonly type = RESET_POSSIBLE_CLIENTS;
}

export class AddRecordMessage implements Action {
    readonly type = ADD_RECORD_MESSAGE;

    constructor(public payload: RecordMessage) {}
}

export class ResetFullClientInformation implements Action {
    readonly type = RESET_FULL_CLIENT_INFORMATION;
}

export class UpdateRecordPermissionRequest implements Action {
    readonly type = UPDATE_RECORD_PERMISSION_REQUEST;

    constructor(public payload: RecordPermissionRequest){}
}

export type RecordsActions =
    | ResetPossibleClients
    | AddRecordDocument
    | AddRecordMessage
    | ResetFullClientInformation
    | RecordsSetActions
    | RecordStartActions
    | UpdateRecordPermissionRequest;
