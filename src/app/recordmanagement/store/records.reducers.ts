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

import { RestrictedRecord } from "../models/record.model";
import {
    RecordsActions,
    SET_CONSULTANTS,
    SET_COUNTRY_STATES,
    SET_ORIGIN_COUNTRIES,
    SET_RECORD_STATES,
    SET_RECORD_TAGS,
    SET_RECORDS
} from './records.actions';
import {OriginCountry} from '../models/country.model';
import {RecordTag} from '../models/record_tags.model';

export interface RecordsState {
    records: RestrictedRecord[];
    consultants: RestrictedRecord[];
    origin_countries: OriginCountry[];
    record_tags: RecordTag[];
    record_states: any,
    country_states: any,
}

const initialState: RecordsState = {
    records: null,
    consultants: null,
    origin_countries: null,
    record_tags: null,
    record_states: null,
    country_states: null,
};

export function recordsReducer(state = initialState, action: RecordsActions) {
    switch (action.type) {
        case SET_RECORDS:
            return {
                ...state,
                records: action.payload
            };
        case SET_CONSULTANTS:
            return {
                ...state,
                consultants: action.payload
            };
        case SET_ORIGIN_COUNTRIES:
            return {
                ...state,
                origin_countries: action.payload
            };
        case SET_RECORD_TAGS:
            return {
                ...state,
                record_tags: action.payload
            };
        case SET_RECORD_STATES:
            return{
                ...state,
                record_states: action.payload
            };
        case SET_COUNTRY_STATES:
            return {
                ...state,
                country_states: action.payload
            };
        default:
            return state;
    }
}
