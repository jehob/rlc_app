import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { LOGIN_URL } from "../statics/api_urls.statics";

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router, private http: HttpClient) {}

  login(email: string, password: string) {
    this.http
      .post(LOGIN_URL, { username: email, password: password })
      .subscribe(
        (response: { token }) => {
          console.log(response);
          this.token = response.token;
          this.router.navigate(["/dashboard"]);
        },
        error => {
          console.log(error);
        }
      );
  }

  logout() {
    this.token = null;
  }

  isAuthenticated() {
    return this.token != null;
  }

  getToken() {
    return this.token;
  }
}
