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

import {AbstractControl, FormGroup} from '@angular/forms';


export const passwordValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password: string = control.value;
    const hasNumber = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasSpecial = /[$@!%*?&+=#'"`\/<>,.^()[\]\\|{}]/.test(password);
    const length = password.length >= 9;
    if (!hasNumber || !hasUpper || !hasLower || !hasSpecial)
        return { weak: true };
    else if (!length) return { short: true };
    return null;
};

export const matchValidator = (field1: string, field2: string) => {
    return (g: FormGroup) => {
        return g.get(field1).value === g.get(field2).value
            ? null
            : { mismatch: true };
    };
};
