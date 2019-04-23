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

export class OriginCountry implements Filterable{
    constructor(public id: string, public name: string, public state: string){
        this.id = id;
        this.name = name;
        this.state = state;
    }

    static getOriginCountriesFromJsonArray(jsonArray){
        const countries: OriginCountry[] = [];
        Object.values(jsonArray).map(jsonCountry => {
            countries.push(OriginCountry.getOriginCountryFromJson(jsonCountry));
        });
        return countries;
    }

    static getOriginCountryFromJson(json){
        return new OriginCountry(json.id, json.name, json.state);
    }

    getFilterableProperty(){
        return this.name;
    }
}
