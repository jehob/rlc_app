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

import { Injectable } from "@angular/core";
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable()
export class SnackbarService {
    constructor(private snackBar: MatSnackBar) {}

    public showSuccessSnackBar(message: string) {
        const config = new MatSnackBarConfig();
        config.panelClass = ["snackbar__success"];
        config.duration = 2500;
        config.verticalPosition = "top";
        this.snackBar.open(message, "", config);
    }

    public showErrorSnackBar(message: string) {
        const config = new MatSnackBarConfig();
        config.panelClass = ["snackbar__error"];
        config.duration = 2500;
        config.verticalPosition = "top";
        this.snackBar.open(message, "", config);
    }
}
