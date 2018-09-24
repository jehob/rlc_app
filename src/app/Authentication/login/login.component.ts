import { Component, OnInit } from "@angular/core";
import {AuthService} from '../../../app/services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService,private route: ActivatedRoute,private router: Router) {

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
