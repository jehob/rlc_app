import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import {
  ActivatedRouteSnapshot,
  CanActivate, Router,
  RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authenticated = this.auth.isAuthenticated();
    if (!authenticated) {
      this.router.navigate(["login"]);
    }
    return authenticated;
  }
}
