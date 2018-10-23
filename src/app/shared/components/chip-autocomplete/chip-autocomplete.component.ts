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

import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import {
    FormControl,
    FormGroup,
} from "@angular/forms";

import { Observable } from "rxjs";
import {
    MatAutocomplete,
    MatAutocompleteSelectedEvent,
    MatChipInputEvent
} from "@angular/material";
import { map, startWith } from "rxjs/operators";
import {Filterable} from '../../models/filterable.model';

@Component({
    selector: "app-chip-autocomplete",
    templateUrl: "./chip-autocomplete.component.html",
    styleUrls: ["./chip-autocomplete.component.scss"]
})
export class ChipAutocompleteComponent implements OnInit, OnChanges {
    selectedValues: Filterable[] = [];
    filteredValues: Observable<Filterable[]>;
    @Input()
    allValues: Filterable[];
    @Input()
    errors;
    @Input()
    placeholder: string;

    @ViewChild("valueInput")
    valueInput: ElementRef<HTMLInputElement>;
    @ViewChild("auto")
    matAutocomplete: MatAutocomplete;

    valuesForm: FormGroup;

    @Output()
    selectedValuesChanged = new EventEmitter();

    constructor() {
        this.valuesForm = new FormGroup({
            filterValue: new FormControl("")
        });
    }

    ngOnInit() {

        this.filteredValues = this.valuesForm.controls[
            "filterValue"
            ].valueChanges.pipe(
            startWith(""),
            map(
                (filterValue: string | null) =>
                    filterValue
                        ? this._filter(filterValue)
                        : this.allValues.slice()
            )
        );
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.errors) {
            this.valuesForm.controls["filterValue"].setErrors(
                changes.errors.currentValue
            );
        } else {
            this.valuesForm.controls["filterValue"].setErrors(null);
        }
    }

    private _filter(value): any[] {
        if (typeof value !== "string") return [];
        const filterValue = value.toLowerCase();

        return this.allValues.filter(
            fromAllValues =>
                fromAllValues
                    .getFilterableProperty()
                    .toLowerCase()
                    .indexOf(filterValue) !== -1
        );
    }

    removeValue(value: Filterable) {
        const index = this.selectedValues.indexOf(value);
        if (index >= 0) {
            this.selectedValues.splice(index, 1);
            this.selectedValuesChanged.emit(this.selectedValues);
            this.allValues.push(value);
        }
    }

    selected(event: MatAutocompleteSelectedEvent) {
        this.selectedValues.push(
            this.allValues.find(
                value =>
                    value.getFilterableProperty() === event.option.viewValue
            )
        );
        this.selectedValuesChanged.emit(this.selectedValues);

        this.allValues = this.allValues.filter(
            value => value.getFilterableProperty() !== event.option.viewValue
        );
        this.valueInput.nativeElement.value = "";
        this.valuesForm.controls["filterValue"].setValue("");
    }

    addValue(event: MatChipInputEvent) {
        if (!this.matAutocomplete.isOpen) {
            const input = event.input;
            if (input) {
                input.value = "";
            }
            this.valuesForm.setValue(null);
        }
    }
}
