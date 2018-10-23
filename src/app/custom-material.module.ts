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

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
    MAT_DATE_LOCALE,
    MAT_SNACK_BAR_DEFAULT_OPTIONS,
    MatButtonModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatTreeModule,
    MatChipsModule, MatDialogModule, MatRadioModule, MatRadioGroup, MatAutocompleteModule, MatGridListModule, MatTableModule
} from '@angular/material';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatExpansionModule,
        MatListModule,
        MatSnackBarModule,
        MatTreeModule,
        MatChipsModule,
        MatDialogModule,
        MatRadioModule,
        MatAutocompleteModule,
        MatGridListModule,
        MatTableModule
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatExpansionModule,
        MatListModule,
        MatSnackBarModule,
        MatTreeModule,
        MatChipsModule,
        MatDialogModule,
        MatRadioModule,
        MatAutocompleteModule,
        MatGridListModule,
        MatTableModule
    ],
    declarations: [],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: "de-DE" },
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: { duration: 2500, verticalPosition: "top" }
        }
    ]
})
export class CustomMaterialModule {}
