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

import {Filterable} from '../../shared/models/filterable.model';
import {RestrictedUser} from './user.model';

export class RestrictedGroup implements Filterable {
   constructor(public id: string, public name: string){
       this.id = id;
       this.name = name;
   }

    static getRestrictedGroupsFromJsonArray(jsonArray){
        const restrictedGroups: Array<RestrictedGroup> = [];
        Object.values(jsonArray).map(restrictedJsonUser => {
            restrictedGroups.push(
                RestrictedGroup.getRestrictedUserFromJson(restrictedJsonUser)
            );
        });
        return restrictedGroups;
    }

    static getRestrictedUserFromJson(json) {
        if (json) return new RestrictedGroup(json.id, json.name);
        return null;
    }

   getFilterableProperty() {
       return this.name;
   }
}

export class FullGroup extends RestrictedGroup {
    constructor(
        id: string,
        name: string,
        public creator_id: string,
        public members: RestrictedUser[]
    ){
        super(id, name);
        this.creator_id = creator_id;
        this.members = members;
    }

    static getFullGroupFromJson(json){
        if (json)
            return new FullGroup(
                json.id,
                json.name,
                json.creator,
                json.group_members
            );
        return null;
    }
}
