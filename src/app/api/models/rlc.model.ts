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

import {Filterable} from '../../shared/models/filterable.model';

export class RestrictedRlc implements Filterable{
    constructor(public id: string, public name: string) {
        this.id = id;
        this.name = name;
    }

    static getRestrictedRlcsFromJsonArray(jsonArray) {
        const restrictedRlcs: Array<RestrictedRlc> = [];
        Object.values(jsonArray).forEach(restrictedJsonUser => {
            restrictedRlcs.push(RestrictedRlc.getRestrictedRlcFromJson(restrictedJsonUser));
        });
        return restrictedRlcs;
    }

    static getRestrictedRlcFromJson(json){
        return new RestrictedRlc(json.id, json.name);
    }

    getFilterableProperty(){
        return this.name;
    }
}
