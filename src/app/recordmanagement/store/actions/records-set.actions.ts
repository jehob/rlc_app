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
import {RestrictedRecord} from '../../models/record.model';
import {RecordDocument} from '../../models/record_document.model';
import {RestrictedUser} from '../../../api/models/user.model';
import {OriginCountry} from '../../models/country.model';
import {FullClient} from '../../models/client.model';
import {Tag} from '../../models/tag.model';
import {RecordMessage} from '../../models/record_message.model';


export const SET_SPECIAL_RECORD = "SET_SPECIAL_RECORD";
export const SET_SPECIAL_CLIENT = "SET_SPECIAL_CLIENT";
export const SET_SPECIAL_ORIGIN_COUNTRY = "SET_SPECIAL_ORIGIN_COUNTRY";
export const SET_SPECIAL_RECORD_DOCUMENTS = "SET_SPECIAL_RECORD_DOCUMENTS";
export const SET_SPECIAL_RECORD_MESSAGES = "SET_SPECIAL_RECORD_MESSAGES";
export const SET_RECORDS = "SET_RECORDS";
export const SET_CONSULTANTS = "SET_CONSULTANTS";
export const SET_RECORD_STATES = "SET_RECORD_STATES";
export const SET_COUNTRY_STATES = "SET_COUNTRY_STATES";
export const SET_ORIGIN_COUNTRIES = "SET_ORIGIN_COUNTRIES";
export const SET_RECORD_TAGS = "SET_RECORD_TAGS";
export const SET_POSSIBLE_CLIENTS = "SET_POSSIBLE_CLIENTS";
export const SET_RECORD_DOCUMENT_TAGS = "SET_RECORD_DOCUMENT_TAGS";



export class SetRecords implements Action {
    readonly type = SET_RECORDS;

    constructor(public payload: Array<RestrictedRecord>) {}
}

export class SetSpecialRecordDocuments implements Action {
    readonly type = SET_SPECIAL_RECORD_DOCUMENTS;

    constructor(public payload: RecordDocument[]) {}
}


export class SetConsultants implements Action {
    readonly type = SET_CONSULTANTS;

    constructor(public payload: RestrictedUser[]) {}
}

export class SetOriginCountries implements Action {
    readonly type = SET_ORIGIN_COUNTRIES;

    constructor(public payload: OriginCountry[]) {}
}

export class SetSpecialClient implements Action {
    readonly type = SET_SPECIAL_CLIENT;

    constructor(public payload: FullClient) {}
}

export class SetSpecialOriginCountry implements Action {
    readonly type = SET_SPECIAL_ORIGIN_COUNTRY;

    constructor(public payload: OriginCountry) {}
}

export class SetSpecialRecord implements Action {
    readonly type = SET_SPECIAL_RECORD;

    constructor(public payload: RestrictedRecord) {}
}

export class SetRecordTags implements Action {
    readonly type = SET_RECORD_TAGS;

    constructor(public payload: Tag[]) {}
}

export class SetRecordStates implements Action {
    readonly type = SET_RECORD_STATES;

    constructor(public payload) {}
}

export class SetCountryStates implements Action {
    readonly type = SET_COUNTRY_STATES;

    constructor(public payload) {}
}

export class SetPossibleClients implements Action {
    readonly type = SET_POSSIBLE_CLIENTS;

    constructor(public payload: FullClient[]) {}
}

export class SetRecordDocumentTags implements Action {
    readonly type = SET_RECORD_DOCUMENT_TAGS;

    constructor(public payload: Tag[]) {}
}

export class SetRecordMessages implements Action {
    readonly type = SET_SPECIAL_RECORD_MESSAGES;

    constructor(public payload: RecordMessage[]) {}
}

export type RecordsSetActions =
    | SetRecords
    | SetConsultants
    | SetOriginCountries
    | SetRecordTags
    | SetRecordStates
    | SetSpecialClient
    | SetSpecialOriginCountry
    | SetCountryStates
    | SetPossibleClients
    | SetSpecialRecord
    | SetSpecialRecordDocuments
    | SetRecordMessages
    | SetRecordDocumentTags;
