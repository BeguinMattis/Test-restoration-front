import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Payload } from '../../models/payload.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user: User;

  constructor(private authService: AuthService,
              private http: HttpClient,
              private router: Router) {
    this.user = null;
  }

  getUser(): User {
    if (!(this.user)) {
      this.user = JSON.parse(window.localStorage.getItem('test-restoration-user'));
    }

    return this.user;
  }

  getToken(): string {
    const user: User = this.getUser();

    if (user) {
      return user.token;
    } else {
      return null;
    }
  }

  login(): Promise<void | string> {
    return new Promise((resolve, reject) => {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data: any) => {
        const url: string = environment.test_restoration.back_api_base_url +
          environment.test_restoration.authentication_google_resource_path;
        const options = {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + data.idToken,
            'Content-Type': 'application/json'
          })
        };
        this.http.get<User>(url, options).subscribe((user: User) => {
          this.user = user;
          window.localStorage.setItem('test-restoration-user', JSON.stringify(this.user));
          resolve();
        }, (error: HttpErrorResponse) => {
          const errorMessage = 'Google Authentication API returned an error!';
          console.error('Error: ' + JSON.stringify(error));
          reject(errorMessage);
        });
      }).catch((error: any) => {
        const errorMessage = 'Angular RX Social Login returned an error!';
        console.error('Error: ' + JSON.stringify(error));
        reject(errorMessage);
      });
    });
  }

  private getPayload(): Payload {
    const token: string = this.getToken();

    if (token) {
      return JSON.parse(window.atob(token.split('.')[1]));
    } else {
      return null;
    }
  }

  isSignIn(): boolean {
    const payload: Payload = this.getPayload();

    if (payload) {
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  signOut(): void {
    this.user = null;
    window.localStorage.removeItem('test-restoration-user');
    this.authService.signOut();
    this.router.navigate(['authentication']);
  }
}
