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

import { SidebarComponent } from "./sidebar.component";
import { MatDivider, MatIcon } from "@angular/material";
import { RouterTestingModule } from "@angular/router/testing";
import { AppSandboxService } from "../../services/app-sandbox.service";
import { CoreSandboxService } from "../../services/core-sandbox.service";
import { Router } from "@angular/router";
import { StoreModule } from "@ngrx/store";
describe("SidebarComponent", () => {
    // let apiSandbox: MockApiSandboxService;
    // let appSandbox: MockAppSandboxService;
    // let router: MockRouter;

    let component: SidebarComponent;
    let fixture: ComponentFixture<SidebarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
                // StoreModule.forRoot(fromRoot.reducers)
            ],
            declarations: [SidebarComponent, MatDivider, MatIcon],
            providers: [
                AppSandboxService,
                CoreSandboxService,
                {
                    provide: Router,
                    useClass: class {
                        navigate = jasmine.createSpy("navigate");
                    }
                }
            ]
        }).compileComponents();

        // providers: [ { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }]
    }));

    beforeEach(() => {
        // apiSandbox = new MockApiSandboxService();
        // router = new MockRouter();
        // appSandbox = new MockAppSandboxService();
        // component = new SidebarComponent(router, appSandbox, apiSandbox);
        fixture = TestBed.createComponent(SidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
