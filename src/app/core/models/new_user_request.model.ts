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

import { FullUser, RestrictedUser } from "./user.model";

export class NewUserRequest {
    constructor(
        public id: string,
        public request_from: FullUser,
        public request_processed: RestrictedUser | null,
        public requested: Date,
        public processed_on: Date,
        public state: string
    ) {
        this.id = id;
        this.request_from = request_from;
        this.request_processed = request_processed;
        this.requested = requested;
        this.processed_on = processed_on;
        this.state = state;
    }

    static getNewUserRequestFromJsonArray(jsonArray): NewUserRequest[] | null {
        const newUserRequests: NewUserRequest[] = [];
        Object.values(jsonArray).map(jsonNewUserRequest => {
            newUserRequests.push(
                NewUserRequest.getNewUserRequestFromJson(jsonNewUserRequest)
            );
        });
        return newUserRequests;
    }

    static getNewUserRequestFromJson(json): NewUserRequest {
        return new NewUserRequest(
            json.id,
            FullUser.getFullUserFromJson(json.request_from),
            RestrictedUser.getRestrictedUserFromJson(json.request_processed),
            new Date(json.requested),
            new Date(json.processed_on),
            json.state
        );
    }
}
