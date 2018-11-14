import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppSandboxService } from "../../services/app-sandbox.service";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
    constructor(private router: Router, private appSB: AppSandboxService) {}

    ngOnInit() {}

    active: boolean = false;

    logout() {
        this.appSB.logout();
    }

    /*
    showProfile() {
        this.router.navigate(["profile"]);
    }

    showRecords() {
        this.active = !this.active;
        this.router.navigate(["records"]);
    }

    showAddRecord() {
        this.active = !this.active;
        this.router.navigate(["records/add"]);
    }

    

    showProfiles() {
        this.active = !this.active;
        this.router.navigate(["profiles"]);
    }

    showLandingPage() {
        this.router.navigate([""]);
    }
    */
}
