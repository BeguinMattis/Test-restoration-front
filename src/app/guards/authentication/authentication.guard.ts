import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authenticationService.isSignIn() === true) {
      return true;
    } else {
      this.router.navigate(['authentication']);
      return false;
    }
  }
}
