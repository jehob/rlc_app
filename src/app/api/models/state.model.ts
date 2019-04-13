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

import { Filterable } from "../../shared/models/filterable.model";

export class State implements Filterable {
    constructor(public abbreviation: string, public full_name: string) {
        this.abbreviation = abbreviation;
        this.full_name = full_name;
    }

    static getStatesFromJsonArray(array){
        const states: Array<State> = [];
        array.map(stateArray => {
            states.push(new State(stateArray[0], stateArray[1]));
        });
        return states;
    }

    getFilterableProperty() {
        return this.full_name;
    }
}
