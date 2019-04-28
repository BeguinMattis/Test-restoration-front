import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authenticationService.isSignIn() === true) {
      return true;
    } else {
      this.router.navigate(['authentication']);
      return false;
    }
  }
}
