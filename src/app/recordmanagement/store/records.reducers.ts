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

import { RestrictedRecord } from "../models/record.model";
import {
    ADD_RECORD_DOCUMENT,
    ADD_RECORD_MESSAGE,
    RecordsActions,
    RESET_FULL_CLIENT_INFORMATION,
    RESET_POSSIBLE_CLIENTS,
    SET_CONSULTANTS,
    SET_COUNTRY_STATES,
    SET_ORIGIN_COUNTRIES,
    SET_POSSIBLE_CLIENTS,
    SET_RECORD_DOCUMENT_TAGS,
    SET_RECORD_PERMISSION_REQUESTS,
    SET_RECORD_STATES,
    SET_RECORD_TAGS,
    SET_RECORDS,
    SET_SPECIAL_CLIENT,
    SET_SPECIAL_ORIGIN_COUNTRY,
    SET_SPECIAL_RECORD,
    SET_SPECIAL_RECORD_DOCUMENTS,
    SET_SPECIAL_RECORD_MESSAGES,
    UPDATE_RECORD_PERMISSION_REQUEST
} from "./actions/records.actions";
import { OriginCountry } from "../models/country.model";
import { Tag } from "../models/tag.model";
import { FullClient } from "../models/client.model";
import { RecordDocument } from "../models/record_document.model";
import { RecordMessage } from "../models/record_message.model";
import { RecordPermissionRequest } from "../models/record_permission.model";
import { getIdObjects } from "../../shared/other/reducer-helper";
import {RestrictedUser} from '../../api/models/user.model';

export interface RecordsState {
    special_record: {
        record: RestrictedRecord;
        client: FullClient;
        origin_country: OriginCountry;
        record_documents: { [id: number]: RecordDocument };
        record_messages: { [id: number]: RecordMessage };
    };
    admin: {
        record_permission_requests: { [id: number]: RecordPermissionRequest };
    };
    records: { [id: number]: RestrictedRecord };
    consultants: { [id: number]: RestrictedUser };
    origin_countries: { [id: number]: OriginCountry };
    record_tags: { [id: number]: Tag };
    record_document_tags: { [id: number]: Tag };
    record_states: any;
    country_states: any;
    possible_clients: { [id: number]: FullClient };
}

export const initialState: RecordsState = {
    special_record: {
        record: null,
        client: null,
        origin_country: null,
        record_documents: {},
        record_messages: {}
    },
    admin: {
        record_permission_requests: {}
    },
    records: {},
    consultants: {},
    origin_countries: {},
    record_tags: {},
    record_document_tags: {},
    record_states: [],
    country_states: [],
    possible_clients: {}
};

export function recordsReducer(state = initialState, action: RecordsActions) {
    switch (action.type) {
        case SET_SPECIAL_RECORD:
            return {
                ...state,
                special_record: {
                    ...state.special_record,
                    record: action.payload
                }
            };
        case SET_SPECIAL_CLIENT:
            return {
                ...state,
                special_record: {
                    ...state.special_record,
                    client: action.payload
                }
            };
        case SET_SPECIAL_ORIGIN_COUNTRY:
            return {
                ...state,
                special_record: {
                    ...state.special_record,
                    origin_country: action.payload
                }
            };
        case SET_RECORDS:
            return {
                ...state,
                records: getIdObjects(action.payload)
            };
        case SET_CONSULTANTS:
            return {
                ...state,
                consultants: getIdObjects(action.payload)
            };
        case SET_ORIGIN_COUNTRIES:
            return {
                ...state,
                origin_countries: getIdObjects(action.payload)
            };
        case SET_RECORD_TAGS:
            return {
                ...state,
                record_tags: getIdObjects(action.payload)
            };
        case SET_RECORD_STATES:
            return {
                ...state,
                record_states: action.payload
            };
        case SET_COUNTRY_STATES:
            return {
                ...state,
                country_states: action.payload
            };
        case SET_POSSIBLE_CLIENTS:
            return {
                ...state,
                possible_clients: getIdObjects(action.payload)
            };
        case RESET_POSSIBLE_CLIENTS:
            return {
                ...state,
                possible_clients: []
            };
        case SET_SPECIAL_RECORD_DOCUMENTS:
            return {
                ...state,
                special_record: {
                    ...state.special_record,
                    record_documents: getIdObjects(action.payload)
                }
            };
        case ADD_RECORD_DOCUMENT:
            return {
                ...state,
                special_record: {
                    ...state.special_record,
                    record_documents: {
                        ...state.special_record.record_documents,
                        [action.payload.id]: action.payload
                    }
                }
            };
        case ADD_RECORD_MESSAGE:
            return {
                ...state,
                special_record: {
                    ...state.special_record,
                    record_messages: {
                        ...state.special_record.record_messages,
                        [action.payload.id]: action.payload
                    }
                }
            };
        case SET_SPECIAL_RECORD_MESSAGES:
            return {
                ...state,
                special_record: {
                    ...state.special_record,
                    record_messages: getIdObjects(action.payload)
                }
            };
        case RESET_FULL_CLIENT_INFORMATION:
            return {
                ...state,
                special_record: {
                    ...state.special_record,
                    client: null,
                    origin_country: null,
                    record_documents: [],
                    record_messages: []
                }
            };
        case SET_RECORD_DOCUMENT_TAGS:
            return {
                ...state,
                record_document_tags: getIdObjects(action.payload)
            };
        case SET_RECORD_PERMISSION_REQUESTS:
            return {
                ...state,
                admin: {
                    ...state.admin,
                    record_permission_requests: getIdObjects(action.payload)
                }
            };
        case UPDATE_RECORD_PERMISSION_REQUEST:
            return {
                ...state,
                admin: {
                    ...state.admin,
                    record_permission_requests: {
                        ...state.admin.record_permission_requests,
                        [action.payload.id]: action.payload
                    }
                }
            };
        default:
            return state;
    }
}
