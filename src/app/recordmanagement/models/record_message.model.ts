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

import {RestrictedUser} from '../../api/models/user.model';

export class RecordMessage {
    constructor(
        public id: number,
        public message: string,
        public sender: RestrictedUser,
        public created_on: Date
    ) {
        this.id = id;
        this.message = message;
        this.sender = sender;
        this.created_on = created_on;
    }

    static getRecordMessagesFromJsonArray(jsonArray){
        const recordMessages: RecordMessage[] = [];
        Object.values(jsonArray).map(jsonRecordMessage => {
            recordMessages.push(RecordMessage.getRecordMessageFromJson(jsonRecordMessage));
        });
        return recordMessages;
    }

    static getRecordMessageFromJson(json) {
        const sender = RestrictedUser.getRestrictedUserFromJson(json.sender);
        return new RecordMessage(
            json.id,
            json.message,
            sender,
            json.created_on
        );
    }
}
