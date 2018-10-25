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

    showProfile() {
        this.router.navigate(["profile"]);
    }

    showRecords() {
        this.router.navigate(["records"]);
    }

    showAddRecord() {
        this.router.navigate(["records/add"]);
    }

    logout() {
        this.appSB.logout();
    }

    showProfiles() {
        this.router.navigate(["profiles"]);
    }

    showLandingPage() {
        this.router.navigate([""]);
    }
}
