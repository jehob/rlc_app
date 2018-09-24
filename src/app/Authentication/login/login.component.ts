import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../app/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})

export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  login = {
    email: "jehob@web.de",
    password: "qwe123"
  };

  ngOnInit() {}

  onLogIn() {
    this.auth.login(this.login.email, this.login.password);
  }
}
