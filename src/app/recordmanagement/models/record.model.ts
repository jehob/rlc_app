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

export class FullRecord {
    constructor(
        public id: number,
        public created_on: Date,
        public last_edited: Date,
        public first_contact_date: Date,
        public last_contact_date: Date,
        public record_token: string,
        public note: string,
        public state: string,
        public tags: [number, string],
        public from_rlc: number,
        public client: number,
        public working_on_record: [number]
    ) {
        this.id = id;
        this.created_on = created_on;
        this.last_contact_date = last_contact_date;
        this.last_edited = last_edited;
        this.first_contact_date = first_contact_date;
        this.record_token = record_token;
        this.note = note;
        this.state = state;
        this.tags = tags;
        this.from_rlc = from_rlc;
        this.client = client;
        this.working_on_record = working_on_record;
    }
}

export class RestrictedRecord {}
