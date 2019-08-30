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

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChipAutocompleteComponent} from './components/chip-autocomplete/chip-autocomplete.component';
import {CustomMaterialModule} from '../custom-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutocompleteComponent} from './components/autocomplete/autocomplete.component';
import {GetColorOnHoverDirective} from './directives/get-color-on-hover.directive';
import {AutoExpandDirective} from './directives/auto-expand.directive';
import {ExpandableButtonComponent} from './components/expandable-button/expandable-button.component';

@NgModule({
    imports: [
        CommonModule,
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [ChipAutocompleteComponent, AutocompleteComponent, GetColorOnHoverDirective, AutoExpandDirective, ExpandableButtonComponent],
    exports: [
        CommonModule,
        CustomMaterialModule,
        ChipAutocompleteComponent,
        AutocompleteComponent,
        GetColorOnHoverDirective,
        AutoExpandDirective,
        ExpandableButtonComponent,
        ReactiveFormsModule
    ]
})
export class SharedModule {
}
