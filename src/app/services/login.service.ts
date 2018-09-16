import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { HttpClientModule} from '@angular/common/http';
import {Http} from '@angular/http';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router, private http: HttpClient) {}

  login(email: string, password: string) {
    this.http.post('/api/login/', {'username': email, 'password': password}).subscribe((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  bb(){

  }

  logout() {}

  isAuthenticated() {
    return this.token != null;
  }
}
