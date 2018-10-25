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
import {FullRecord, RestrictedRecord} from '../models/record.model';
import { RestrictedUser } from "../../api/models/user.model";
import { OriginCountry } from "../models/country.model";
import { RecordTag } from "../models/record_tags.model";
import { FullClient } from "../models/client.model";

export const START_LOADING_RECORDS = "START_LOADING_RECORDS";
export const START_LOADING_RECORD_STATICS = "START_LOADING_RECORD_STATICS";
export const START_LOADING_CLIENT_POSSIBILITIES =
    "START_LOADING_CLIENT_POSSIBILITIES";
export const START_LOADING_SPECIAL_RECORD = "START_LOADING_SPECIAL_RECORD";

export const START_ADDING_NEW_RECORD = "START_ADDING_NEW_RECORD";

export const START_SAVING_RECORD = "START_SAVING_RECORD";

export const SET_SPECIAL_RECORD = "SET_SPECIAL_RECORD";
export const SET_SPECIAL_CLIENT = "SET_SPECIAL_CLIENT";
export const SET_SPECIAL_ORIGIN_COUNTRY = "SET_SPECIAL_ORIGIN_COUNTRY";

export const SET_RECORDS = "SET_RECORDS";
export const SET_CONSULTANTS = "SET_CONSULTANTS";
export const SET_RECORD_STATES = "SET_RECORD_STATES";
export const SET_COUNTRY_STATES = "SET_COUNTRY_STATES";

export const SET_ORIGIN_COUNTRIES = "SET_ORIGIN_COUNTRIES";
export const SET_RECORD_TAGS = "SET_RECORD_TAGS";
export const SET_POSSIBLE_CLIENTS = "SET_POSSIBLE_CLIENTS";

export const RESET_POSSIBLE_CLIENTS = "RESET_POSSIBLE_CLIENTS";

export class SetRecords implements Action {
    readonly type = SET_RECORDS;

    constructor(public payload: Array<RestrictedRecord>) {}
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

export class StartSavingRecord implements Action{
    readonly type = START_SAVING_RECORD;

    constructor(public payload: {record: FullRecord, client: FullClient}) {}
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

    constructor(public payload: RecordTag[]) {}
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

export class ResetPossibleClients implements Action {
    readonly type = RESET_POSSIBLE_CLIENTS;
}

export class StartAddingNewRecord implements Action {
    readonly type = START_ADDING_NEW_RECORD;

    constructor(public payload: any) {}
}

export type RecordsActions =
    | SetRecords
    | StartLoadingRecords
    | StartLoadingRecordStatics
    | StartLoadingClientPossibilities
    | StartLoadingSpecialRecord
    | StartSavingRecord
    | SetConsultants
    | SetOriginCountries
    | SetRecordTags
    | SetRecordStates
    | SetSpecialClient
    | SetSpecialOriginCountry
    | SetCountryStates
    | SetPossibleClients
    | SetSpecialRecord
    | ResetPossibleClients
    | StartAddingNewRecord;