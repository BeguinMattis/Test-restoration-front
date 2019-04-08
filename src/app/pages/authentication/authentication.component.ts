import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private authService: AuthService,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    if (this.authenticationService.isSignIn() === true) {
      this.router.navigate(['search']);
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data: any) => {
      this.authenticationService.login(data.idToken).then(() => {
        this.router.navigate(['search']);
      }).catch((errorMessage: string) => {
        // TODO: Display an alert for the user
      });
    }).catch((error: any) => {
      console.error('Error: ' + JSON.stringify(error));
      // TODO: Display an alert for the user
    });
  }
}
