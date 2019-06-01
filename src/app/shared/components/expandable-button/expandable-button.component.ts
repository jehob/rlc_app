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
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output
} from "@angular/core";
import {
    animate,
    animateChild,
    group,
    query,
    state,
    style,
    transition,
    trigger
} from "@angular/animations";
import { colorPrimary, colorWarn } from "../../other/color-helper";

@Component({
    selector: "app-expandable-button",
    templateUrl: "./expandable-button.component.html",
    styleUrls: ["./expandable-button.component.scss"],
    animations: [
        trigger("unFold", [
            state(
                "folded",
                style({
                })
            ),
            state(
                "unfolded",
                style({
                    color: "white",
                    backgroundColor: "{{color}}"
                }), {params: {color: '#003c4d'}}
            ),
            transition("folded <=> unfolded", [
                group([
                    query("@unFoldText", animateChild()),
                    animate(
                        225,
                        style({
                            color: "white",
                            backgroundColor: "{{color}}"
                        })
                    )
                ])
            ])
        ]),
        trigger("unFoldText", [
            state(
                "folded",
                style({
                    opacity: 0,
                    "max-width": "0px",
                    width: "0px"
                })
            ),
            state(
                "unfolded",
                style({
                    opacity: 1.0,
                    "max-width": "{{width}}px",
                    width: "{{width}}px"
                }),
                { params: { width: 100 } }
            ),
            transition("folded <=> unfolded", animate(225))
        ])
    ]
})
export class ExpandableButtonComponent implements AfterViewInit, OnInit {
    colorCode;

    foldState = "folded";

    realWidth;

    @Output()
    buttonClicked = new EventEmitter();

    @Input()
    content: string;

    @Input()
    icon: string;

    @Input()
    color: string;

    @Input()
    styleParams: any;

    constructor(private _changeDetectionRef: ChangeDetectorRef, private el: ElementRef) {}

    ngOnInit(): void {
        if (this.color === "warn") this.colorCode = colorWarn;
        else if (this.color === "primary") this.colorCode = colorPrimary;
        else
            throw Error(
                'ExpandableButtonComponent: color must be "primary" or "warn"'
            );
    }

    ngAfterViewInit(): void {
        if (this.styleParams && this.styleParams['fontSize']){
            this.el.nativeElement.querySelector("#textHolder").style.fontSize = this.styleParams['fontSize'];

            const sizeIndex =  /[^0-9]/.exec(this.styleParams['fontSize']);
            const realSize = parseInt(this.styleParams['fontSize'].substring(0, sizeIndex.index), 10);

            const newIconFontSize = realSize * 1.5;
            this.el.nativeElement.querySelector("#iconHolder").style.fontSize = newIconFontSize + 'px';

            const newPaddingTop = realSize * (1 / 4.0);
            this.el.nativeElement.querySelector("#iconHolder").style.paddingTop = newPaddingTop + 'px';

            const newHeight = realSize * (36 / 14.0);
            this.el.nativeElement.querySelector("#mainDiv").style.height = newHeight + 'px';

            this.realWidth = this.el.nativeElement.querySelector("#textHolder").offsetWidth + realSize / 2.0;
        } else {
            this.realWidth = this.el.nativeElement.querySelector("#textHolder").offsetWidth + 10;
        }

        this._changeDetectionRef.detectChanges();
    }

    onMouseLeave() {
        this.foldState = "folded";
    }

    onMouseEnter() {
        this.foldState = "unfolded";
    }

    onButtonClick() {
        this.buttonClicked.emit();
    }
}
