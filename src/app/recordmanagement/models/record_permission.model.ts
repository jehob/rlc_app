
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

export class RecordPermissionRequest {
    constructor(
        public id: string,
        public request_from: RestrictedUser,
        public request_granted: RestrictedUser | null,
        public record: string,
        public requested: Date,
        public permitted_on: Date,
        public can_edit: Boolean,
        public state: string
    ) {
        this.id = id;
        this.request_from = request_from;
        this.request_granted = request_granted;
        this.record = record;
        this.requested = requested;
        this.permitted_on = permitted_on;
        this.can_edit = can_edit;
        this.state = state;
    }

    static getRecordPermissionRequestsFromJsonArray(jsonArray){
        const recordPermissions: RecordPermissionRequest[] = [];
        Object.values(jsonArray).map(jsonRecordPermission => {
            recordPermissions.push(RecordPermissionRequest.getRecordPermissionRequestFromJson(jsonRecordPermission));
        });
        return recordPermissions;
    }

    static getRecordPermissionRequestFromJson(json){
        console.log('recordpermissionjson', json);
        return new RecordPermissionRequest(
            json.id,
            RestrictedUser.getRestrictedUserFromJson(json.request_from),
            RestrictedUser.getRestrictedUserFromJson(json.request_granted),
            json.record,
            new Date(json.requested),
            new Date(json.permitted_on),
            json.can_edit === 'true',
            json.state
        )
    }
}
