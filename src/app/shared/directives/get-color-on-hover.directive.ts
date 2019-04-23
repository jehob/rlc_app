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

import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: "[appGetColorOnHover]"
})
export class GetColorOnHoverDirective {
    notHighlightedBackground = "#e1e1e1";
    notHighlightedColor = "#b4b4b4";
    notHighlightedBoxShadow = "";
    highlightedBackground = "";
    highlightedColor = "";
    highlightedBoxShadow = "";

    constructor(private el: ElementRef) {
        this.highlightedBackground = this.el.nativeElement.style.backgroundColor;
        this.highlightedColor = this.el.nativeElement.style.color;
        this.highlightedBoxShadow = this.el.nativeElement.style.boxShadow;

        this.unhighlight();
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight();
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.unhighlight()
    }

    private highlight() {
        this.el.nativeElement.style.backgroundColor = this.highlightedBackground;
        this.el.nativeElement.style.color = this.highlightedColor;
        this.el.nativeElement.style.boxShadow = this.highlightedBoxShadow;
    }

    private unhighlight(){
        this.el.nativeElement.style.backgroundColor = this.notHighlightedBackground;
        this.el.nativeElement.style.color = this.notHighlightedColor;
        this.el.nativeElement.style.boxShadow = this.notHighlightedBoxShadow;
    }
}
