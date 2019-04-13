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
        public working_on_record: [number, string],
        public official_note: string,
    ) {
        this.id = id;
        this.token = token;
        this.last_contact_date = last_contact_date;
        this.state = state;
        this.tags = tags;
        this.working_on_record = working_on_record;
        this.official_note = official_note;
    }

    static getRestrictedRecordFromJson(json){
        return new RestrictedRecord(
            json.id,
            json.record_token,
            new Date(json.last_contact_date),
            json.state,
            Tag.getTagsFromJsonArray(json.tagged),
            json.working_on_record,
            json.official_note
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
        official_note: string,
        public created_on: Date,
        public last_edited: Date,
        public first_contact_date: Date,
        public note: string,
        public from_rlc: number,
        public client: number,
        public first_consultation: Date,
        public consultant_team: string,
        public lawyer: string,
        public related_persons: string,
        public contact: string,
        public bamf_token: string,
        public foreign_token: string,
        public first_correspondence: string,
        public circumstances: string,
        public next_steps: string,
        public status_described: string,
        public additional_facts: string,
    ) {
        super(id, token, last_contact_date, state, tags, working_on_record, official_note);
        this.created_on = created_on;
        this.last_edited = last_edited;
        this.first_contact_date = first_contact_date;
        this.note = note;
        this.from_rlc = from_rlc;
        this.client = client;
        this.first_consultation = first_consultation;
        this.contact = contact;
        this.circumstances = circumstances;
        this.consultant_team = consultant_team;
        this.lawyer = lawyer;
        this.related_persons = related_persons;
        this.bamf_token = bamf_token;
        this.foreign_token = foreign_token;
        this.first_correspondence = first_correspondence;
        this.next_steps = next_steps;
        this.status_described = status_described;
        this.additional_facts = additional_facts;
    }

    static getFullRecordFromJson(json){
        return new FullRecord(
            json.id,
            json.record_token,
            new Date(json.last_contact_date),
            json.state,
            Tag.getTagsFromJsonArray(json.tagged),
            json.working_on_record,
            json.official_note,
            new Date(json.created_on),
            new Date(json.last_edited),
            new Date(json.first_contact_date),
            json.note,
            json.from_rlc,
            json.client,
            new Date(json.first_consultation),
            json.consultant_team,
            json.lawyer,
            json.related_persons,
            json.contact,
            json.bamf_token,
            json.foreign_token,
            json.first_correspondence,
            json.circumstances,
            json.next_steps,
            json.status_described,
            json.additional_facts
        );
    }
}

export const isRestrictedRecord = (record): boolean => {
    return !(record.note || record.note === '');
};
