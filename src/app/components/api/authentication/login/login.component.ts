import { Component, OnInit } from "@angular/core";
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService) {

  }

  login = {
    email: 'velox9995@gmail.com',
    password: 'rlcmaster'
  }

  ngOnInit() {}

  onLogIn(email, password){
    this.auth.login('velox9995@gmail.com', 'rlcmaster');
  }
}
