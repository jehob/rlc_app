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

import {Tag} from './tag.model';

export class RestrictedRecord {
    constructor(
        public id: number,
        public token: string,
        public last_contact_date: Date,
        public state: string,
        public tags: Tag[],
        public working_on_record: [number, string]
    ) {
        this.id = id;
        this.token = token;
        this.last_contact_date = last_contact_date;
        this.state = state;
        this.tags = tags;
        this.working_on_record = working_on_record;
    }

    static getRestrictedRecordFromJson(json){
        return new RestrictedRecord(
            json.id,
            json.record_token,
            new Date(json.last_contact_date),
            json.state,
            Tag.getTagsFromJsonArray(json.tagged),
            json.working_on_record
        );
    }
}

export class FullRecord extends RestrictedRecord {
    constructor(
        id: number,
        token: string,
        last_contact_date: Date,
        state: string,
        tags: Tag[],
        working_on_record: [number, string],
        public created_on: Date,
        public last_edited: Date,
        public first_contact_date: Date,
        public note: string,
        public from_rlc: number,
        public client: number
    ) {
        super(id, token, last_edited, state, tags, working_on_record);
        this.created_on = created_on;
        this.last_edited = last_edited;
        this.first_contact_date = first_contact_date;
        this.note = note;
        this.from_rlc = from_rlc;
        this.client = client;
    }

    static getFullRecordFromJson(json){
        return new FullRecord(
            json.id,
            json.record_token,
            new Date(json.last_contact_date),
            json.state,
            Tag.getTagsFromJsonArray(json.tagged),
            json.working_on_record,
            new Date(json.created_on),
            new Date(json.last_edited),
            new Date(json.first_contact_date),
            json.note,
            json.from_rlc,
            json.client
        );
    }
}
