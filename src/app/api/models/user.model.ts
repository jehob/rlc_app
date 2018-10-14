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

export class FullUser {
    public id: string;
    public email: string;
    public name: string;
    public birthday: Date;
    public phone_number: string;
    public street: string;
    public city: string;
    public postal_code: string;

    constructor(
        id: string = '',
        email: string = '',
        name: string = '',
        birthday: Date = new Date(),
        phone_number: string = '',
        street: string = '',
        city: string = '',
        postal_code: string = ''
    ) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.birthday = birthday;
        this.phone_number = phone_number;
        this.street = street;
        this.city = city;
        this.postal_code = postal_code;
    }
}

export class RestrictedUser {}
