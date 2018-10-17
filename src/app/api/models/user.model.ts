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

import { DateFormatPipe } from "../pipes/api.pipes";

export class RestrictedUser {
    constructor(public id: string, public name: string) {
        this.id = id;
        this.name = name;
    }

    static getRestrictedUsersFromJsonArray(jsonArray) {
        const restrictedUsers: Array<RestrictedUser> = [];
        Object.values(jsonArray).map(restrictedJsonUser => {
            restrictedUsers.push(RestrictedUser.getRestrictedUserFromJson(restrictedJsonUser));
        });
        return restrictedUsers;
    }

    static getRestrictedUserFromJson(json){
        return new RestrictedUser(json.id, json.name);
    }
}

export class FullUser extends RestrictedUser {

    constructor(
        id: string = "",
        public email: string = "",
        name: string = "",
        public birthday: Date = new Date(),
        public phone_number: string = "",
        public street: string = "",
        public city: string = "",
        public postal_code: string = ""
    ) {
        super(id, name);
        this.email = email;
        this.birthday = birthday;
        this.phone_number = phone_number;
        this.street = street;
        this.city = city;
        this.postal_code = postal_code;
    }

    static getFullUserFromJson(json) {
        return new FullUser(
            json.id,
            json.email,
            json.name,
            new Date(json.birthday),
            json.phone_number,
            json.street,
            json.city,
            json.postal_code
        );
    }

    /**
     * compares this instance with another and returns updateObject with every field which will be changed
     * used to generated the update object for patching user in backend
     * @param updates potential updates for object
     */
    getUpdates(updates: FullUser, datePipe: DateFormatPipe) {
        const changes = {};
        if (this.birthday !== updates.birthday)
            changes["birthday"] = datePipe.transform(updates.birthday);
        if (this.phone_number !== updates.phone_number)
            changes["phone_number"] = updates.phone_number;
        if (this.street !== updates.street) changes["street"] = updates.street;
        if (this.city !== updates.city) changes["city"] = updates.city;
        if (this.postal_code !== updates.postal_code)
            changes["postal_code"] = updates.postal_code;
        return changes;
    }
}
