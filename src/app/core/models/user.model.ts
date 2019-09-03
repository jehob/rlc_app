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

import { CoreSandboxService } from "../services/core-sandbox.service";
import { Filterable } from "../../shared/models/filterable.model";

export class RestrictedUser implements Filterable {
    constructor(public id: string, public name: string) {
        this.id = id;
        this.name = name;
    }

    static getRestrictedUsersFromJsonArray(jsonArray): RestrictedUser[] {
        const restrictedUsers: RestrictedUser[] = [];
        Object.values(jsonArray).map(restrictedJsonUser => {
            restrictedUsers.push(
                RestrictedUser.getRestrictedUserFromJson(restrictedJsonUser)
            );
        });
        return restrictedUsers;
    }

    static getRestrictedUserFromJson(json): RestrictedUser {
        if (json) return new RestrictedUser(json.id, json.name);
        return null;
    }

    getFilterableProperty() {
        return this.name;
    }
}

export class ForeignUser extends RestrictedUser {
    /**
     * ForeignUser represents a user from the own rlc but not the user himself -> contact information,
     * RestrictedUser < foreign < full
     */
    constructor(
        id: string = "",
        public email: string = "",
        name: string = "",
        public phone_number: string = ""
    ) {
        super(id, name);
        this.email = email;
        this.phone_number = phone_number;
    }

    static getForeignUserFromJson(json): ForeignUser {
        if (json)
            return new ForeignUser(
                json.id,
                json.email,
                json.name,
                json.phone_number
            );
        return null;
    }
}

export class FullUser extends RestrictedUser {
    /**
     * FullUser represents the user itself with FULL information
     * @param id
     * @param email
     * @param name
     * @param birthday
     * @param phone_number
     * @param street
     * @param city
     * @param postal_code
     * @param user_state
     * @param user_record_state
     */
    constructor(
        id: string = "",
        public email: string = "",
        name: string = "",
        public birthday: Date = new Date(),
        public phone_number: string = "",
        public street: string = "",
        public city: string = "",
        public postal_code: string = "",
        public user_state: string = "",
        public user_record_state: string = ""
    ) {
        super(id, name);
        this.email = email;
        this.birthday = birthday;
        this.phone_number = phone_number;
        this.street = street;
        this.city = city;
        this.postal_code = postal_code;
        this.user_state = user_state;
        this.user_record_state = user_record_state;
    }

    static getFullUserFromJson(json): FullUser {
        if (json)
            return new FullUser(
                json.id,
                json.email,
                json.name,
                new Date(json.birthday),
                json.phone_number,
                json.street,
                json.city,
                json.postal_code,
                json.user_state,
                json.user_record_state
            );
        return null;
    }

    static getFullUsersFromJsonArray(jsonArray): FullUser[] {
        const fullUsers: FullUser[] = [];
        Object.values(jsonArray).map(fullJsonUser => {
            fullUsers.push(FullUser.getFullUserFromJson(fullJsonUser));
        });
        return fullUsers;
    }
}
