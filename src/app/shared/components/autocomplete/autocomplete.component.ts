import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
    @Input()
    allValues: Filterable[];
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
    }

    ngOnChanges(changes: SimpleChanges){
        if (changes.errors){
           this.valueForm.controls["value"].setErrors(changes.errors.currentValue);
        } else {
            this.valueForm.controls["value"].setErrors(null);
        }
        if (changes.setSelectedValue){
            if (changes.setSelectedValue.currentValue){
                this.valueForm.controls["value"].setValue(changes.setSelectedValue.currentValue);
                this.valueForm.controls["value"].disable()
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
        this.selectedValueChanged.emit(this.valueForm.controls['value'].value)
    }
}
