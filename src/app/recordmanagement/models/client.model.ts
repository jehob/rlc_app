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

export class FullClient {
    constructor(
        public id: string,
        public name: string,
        public created_on: Date,
        public last_edited: Date,
        public birthday: Date,
        public origin_country: string,
        public note: string,
        public phone_number: string
    ) {
        this.id = id;
        this.name = name;
        this.created_on = created_on;
        this.last_edited = last_edited;
        this.birthday = birthday;
        this.origin_country = origin_country;
        this.note = note;
        this.phone_number = phone_number;
    }

    static getFullClientsFromJsonArray(jsonArray){
        const clients: FullClient[] = [];
        Object.values(jsonArray).map(jsonClient => {
            clients.push(FullClient.getFullClientFromJson(jsonClient));
        })
        return clients;
    }

    static getFullClientFromJson(json) {
        return new FullClient(
            json.id,
            json.name,
            json.created_on,
            json.last_edited,
            json.birthday,
            json.origin_country,
            json.note,
            json.phone
        );
    }
}
