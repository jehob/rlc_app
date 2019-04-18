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

import {
    Component, ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges, ViewChild
} from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Filterable } from "../../models/filterable.model";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import {MatAutocompleteTrigger} from '@angular/material';

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
    @Input()
    disableAfterSetSelectedValue: boolean;

    @Input()
    noErrorIfNotInAllValues: boolean;

    selectionError = null;
    filteredValues: Observable<Filterable[]>;

    @Output()
    selectedValueChanged = new EventEmitter();

    @Input()
    valueToShow: string;

    //@ViewChild('autocomplete') autocompleteRef: ElementRef;
    @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

    constructor() {
        this.valueForm = new FormGroup({
            value: new FormControl("")
        });
    }

    ngOnInit() {
        this.disableAfterSetSelectedValue =
            this.disableAfterSetSelectedValue !== undefined;
        this.noErrorIfNotInAllValues = !(
            this.noErrorIfNotInAllValues !== undefined
        );

        //console.log('value to show', this.valueToShow);
        if (!this.valueToShow){
            this.valueToShow = 'name';
        }

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
        // console.log("changes", changes);
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
                this.selectionError = null;
                if (this.disableAfterSetSelectedValue)
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

    onInputChange() {
        if (this.noErrorIfNotInAllValues) {
            if (
                this.allValues.filter(
                    (toFilter: Filterable) =>
                        toFilter.getFilterableProperty() ===
                        this.valueForm.controls["value"].value
                ).length === 0
            ) {
                this.selectionError = {
                    notInAllValues: true
                };
                this.valueForm.controls["value"].setErrors({
                    notInAllValues: true
                });
            }
        }
    }
}
