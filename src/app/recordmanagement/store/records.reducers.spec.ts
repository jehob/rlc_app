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

// describe('PizzasReducer', () => {
//     describe('undefined action', () => {
//         it('should return the default state', () => {
//             const { initialState } = fromPizzas;
//             const action = {};
//             const state = fromPizzas.reducer(undefined, action);
//
//             expect(state).toBe(initialState);
//         });
//     });
//     // I nest all tests under the reducer's name
//     // for readability in the terminal
// });

import * as RecordsReducer from './records.reducers';


describe('RecordsReducers', () => {
    describe('undefined action', () => {
        it('should return the default state', () => {
            const { initialState } = RecordsReducer;
            const action = {type: "aa"};
            // const state = RecordsReducer.recordsReducer(undefined, action);

            // expect(state).toBe(initialState);
        });
    });
    // I nest all tests under the reducer's name
    // for readability in the terminal
});
