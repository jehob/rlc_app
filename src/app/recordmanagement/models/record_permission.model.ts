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

import { RestrictedUser } from "../../api/models/user.model";

export class RecordPermissionRequest {
    constructor(
        public id: string,
        public request_from: RestrictedUser,
        public request_processed: RestrictedUser | null,
        public record: string,
        public requested: Date,
        public processed_on: Date,
        public can_edit: Boolean,
        public state: string
    ) {
        this.id = id;
        this.request_from = request_from;
        this.request_processed = request_processed;
        this.record = record;
        this.requested = requested;
        this.processed_on = processed_on;
        this.can_edit = can_edit;
        this.state = state;
    }

    static getRecordPermissionRequestsFromJsonArray(
        jsonArray
    ): RecordPermissionRequest[] {
        const recordPermissions: RecordPermissionRequest[] = [];
        Object.values(jsonArray).map(jsonRecordPermission => {
            recordPermissions.push(
                RecordPermissionRequest.getRecordPermissionRequestFromJson(
                    jsonRecordPermission
                )
            );
        });
        return recordPermissions;
    }

    static getRecordPermissionRequestFromJson(json): RecordPermissionRequest {
        return new RecordPermissionRequest(
            json.id,
            RestrictedUser.getRestrictedUserFromJson(json.request_from),
            RestrictedUser.getRestrictedUserFromJson(json.request_processed),
            json.record,
            new Date(json.requested),
            new Date(json.processed_on),
            json.can_edit === "true",
            json.state
        );
    }
}
