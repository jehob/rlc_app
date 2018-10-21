import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Filterable } from "../../models/filterable.model";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
    selector: "app-autocomplete",
    templateUrl: "./autocomplete.component.html",
    styleUrls: ["./autocomplete.component.scss"]
})
export class AutocompleteComponent implements OnInit {
    valueForm: FormGroup;
    @Input()
    placeholder: string;
    @Input()
    allValues: Filterable[];
    @Input()
    errors;

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
