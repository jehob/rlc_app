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
