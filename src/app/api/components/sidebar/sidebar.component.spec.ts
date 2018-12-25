import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SidebarComponent } from "./sidebar.component";
import { MatDivider, MatIcon } from "@angular/material";
import { RouterTestingModule } from "@angular/router/testing";
import { AppSandboxService } from "../../services/app-sandbox.service";
import { ApiSandboxService } from "../../services/api-sandbox.service";
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
                ApiSandboxService,
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
