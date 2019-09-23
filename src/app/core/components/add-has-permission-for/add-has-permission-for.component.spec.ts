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

import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddHasPermissionForComponent } from "./add-has-permission-for.component";

describe("AddHasPermissionForComponent", () => {
    let component: AddHasPermissionForComponent;
    let fixture: ComponentFixture<AddHasPermissionForComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddHasPermissionForComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddHasPermissionForComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
