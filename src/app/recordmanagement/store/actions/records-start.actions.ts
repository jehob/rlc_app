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

import { Action } from "@ngrx/store";

import {FullRecord, RestrictedRecord} from '../../models/record.model';
import {FullClient} from '../../models/client.model';
import {Tag} from '../../models/tag.model';

export const START_REQUESTING_RECORD_PERMISSION =
    "START_REQUESTING_RECORD_PERMISSION";
export const START_LOADING_RECORDS = "START_LOADING_RECORDS";
export const START_LOADING_RECORD_STATICS = "START_LOADING_RECORD_STATICS";
export const START_LOADING_CLIENT_POSSIBILITIES =
    "START_LOADING_CLIENT_POSSIBILITIES";
export const START_LOADING_SPECIAL_RECORD = "START_LOADING_SPECIAL_RECORD";

export const START_ADDING_NEW_RECORD = "START_ADDING_NEW_RECORD";
export const START_ADDING_NEW_RECORD_DOCUMENT =
    "START_ADDING_NEW_RECORD_DOCUMENT";
export const START_ADDING_NEW_RECORD_MESSAGE =
    "START_ADDING_NEW_RECORD_MESSAGE";

export const START_SETTING_RECORD_DOCUMENT_TAGS =
    "START_SETTING_RECORD_DOCUMENT_TAGS";

export const START_SAVING_RECORD = "START_SAVING_RECORD";


export class StartRequestingReadPermission implements Action {
    readonly type = START_REQUESTING_RECORD_PERMISSION;

    constructor(public payload: RestrictedRecord) {}
}


export class StartLoadingRecords implements Action {
    readonly type = START_LOADING_RECORDS;

    constructor(public payload: string) {}
}

export class StartLoadingRecordStatics implements Action {
    readonly type = START_LOADING_RECORD_STATICS;
}

export class StartLoadingClientPossibilities implements Action {
    readonly type = START_LOADING_CLIENT_POSSIBILITIES;

    constructor(public payload: Date) {}
}

export class StartLoadingSpecialRecord implements Action {
    readonly type = START_LOADING_SPECIAL_RECORD;

    constructor(public payload: string) {}
}

export class StartSavingRecord implements Action {
    readonly type = START_SAVING_RECORD;

    constructor(public payload: { record: FullRecord; client: FullClient }) {}
}

export class StartAddingNewRecord implements Action {
    readonly type = START_ADDING_NEW_RECORD;

    constructor(public payload: any) {}
}

export class StartAddingNewRecordDocument implements Action {
    readonly type = START_ADDING_NEW_RECORD_DOCUMENT;

    constructor(public payload: any) {}
}

export class StartAddingNewRecordMessage implements Action {
    readonly type = START_ADDING_NEW_RECORD_MESSAGE;

    constructor(public payload: any) {}
}

export class StartSettingRecordDocumentTags implements Action {
    readonly type = START_SETTING_RECORD_DOCUMENT_TAGS;

    constructor(public payload: { tags: Tag[]; document_id: string }) {}
}

export type RecordStartActions =
    | StartRequestingReadPermission
    | StartLoadingRecords
    | StartLoadingRecordStatics
    | StartLoadingClientPossibilities
    | StartLoadingSpecialRecord
    | StartSavingRecord
    | StartAddingNewRecord
    | StartAddingNewRecordDocument
    | StartAddingNewRecordMessage
    | StartSettingRecordDocumentTags;
