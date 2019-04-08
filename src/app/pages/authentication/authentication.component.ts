import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { Token } from '../../models/token.model';
import { User } from '../../models/user.model';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private authService: AuthService,
              private http: HttpClient,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData: any) => {
      const url: string = environment.test_restoration.back_api_base_url + environment.test_restoration.authenticationGoogle;
      const options = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + userData.idToken,
          'Content-Type': 'application/json'
        })
      };
      this.http.get<Token>(url, options).subscribe((token: Token) => {
        const user: User = {
          lastName: userData.lastName,
          firstName: userData.firstName,
          email: userData.email,
          photoUrl: userData.photoUrl,
          token: token.token
        };
        this.authenticationService.login(user);
        this.router.navigate(['search']);
        }, (error: HttpErrorResponse) => {
          console.error('Error: ' + JSON.stringify(error));
        // TODO: Display an alert for the user
        });
    }).catch((error: any) => {
      console.error('Error: ' + JSON.stringify(error));
      // TODO: Display an alert for the user
    });
  }
}
