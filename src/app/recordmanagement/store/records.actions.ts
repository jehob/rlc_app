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
import { RestrictedRecord } from "../models/record.model";
import {RestrictedUser} from '../../api/models/user.model';
import {OriginCountry} from '../models/country.models';

export const SET_RECORDS = "SET_RECORDS";
export const TRY_LOADING_RECORDS = "TRY_LOADING_RECORDS";
export const SET_CONSULTANTS = 'SET_CONSULTANTS';
export const SET_RECORD_STATES = 'SET_RECORD_STATES';
export const SET_COUNTRY_STATES = 'SET_COUNTRY_STATES';
export const SET_ORIGIN_COUNTRIES = 'SET_ORIGIN_COUNTRIES';
export const SET_RECORD_TAGS = 'SET_RECORD_TAGS';

export class SetRecords implements Action {
    readonly type = SET_RECORDS;

    constructor(public payload: Array<RestrictedRecord>) {}
}

export class StartLoadingRecords implements Action {
    readonly type = TRY_LOADING_RECORDS;
}

export class SetConsultants implements Action {
    readonly type = SET_CONSULTANTS;

    constructor(public payload: Array<RestrictedUser>){}
}

export class SetOriginCountries implements Action{
    readonly type = SET_ORIGIN_COUNTRIES;

    constructor(public payload: Array<OriginCountry>){}
}

export type RecordsActions = SetRecords | StartLoadingRecords | SetConsultants | SetOriginCountries;
