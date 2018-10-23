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
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Filterable } from "../../models/filterable.model";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
    selector: "app-autocomplete",
    templateUrl: "./autocomplete.component.html",
    styleUrls: ["./autocomplete.component.scss"]
})
export class AutocompleteComponent implements OnInit, OnChanges {
    valueForm: FormGroup;
    @Input()
    placeholder: string;
    allValues: Filterable[];
    @Input()
    allValuesObservable: Observable<Filterable[]>;

    @Input()
    errors;
    @Input()
    setSelectedValue;

    filteredValues: Observable<Filterable[]>;

    @Output()
    selectedValueChanged = new EventEmitter();

    constructor() {
        this.valueForm = new FormGroup({
            value: new FormControl("")
        });
    }

    ngOnInit() {
        this.allValuesObservable.subscribe(values => {
            this.allValues = values;
            this.filteredValues = this.valueForm.controls[
                "value"
            ].valueChanges.pipe(
                startWith(""),
                map(
                    filterValue =>
                        filterValue
                            ? this._filter(filterValue)
                            : this.allValues.slice()
                )
            );
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.errors) {
            this.valueForm.controls["value"].setErrors(
                changes.errors.currentValue
            );
        } else {
            this.valueForm.controls["value"].setErrors(null);
        }
        if (changes.setSelectedValue) {
            if (changes.setSelectedValue.currentValue) {
                this.valueForm.controls["value"].setValue(
                    changes.setSelectedValue.currentValue
                );
                this.valueForm.controls["value"].disable();
            } else {
                this.valueForm.controls["value"].setValue("");
                this.valueForm.controls["value"].enable();
            }
        }
    }

    display(filterable?: Filterable) {
        //console.log('display function');
        return filterable ? filterable.getFilterableProperty() : undefined;
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

    selected() {
        this.selectedValueChanged.emit(this.valueForm.controls["value"].value);
    }
}
