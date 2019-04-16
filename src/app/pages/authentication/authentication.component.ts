import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    if (this.authenticationService.isSignIn() === true) {
      this.router.navigate(['search']);
    }
  }

  signInWithGoogle(): void {
    this.authenticationService.signIn().then(() => {
        this.router.navigate(['search']);
    }).catch((errorMessage: string) => {
      // TODO: Display an alert for the user
    });
  }
}
