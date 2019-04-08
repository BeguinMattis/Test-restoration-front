import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { Payload } from '../../models/payload.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user: User;

  constructor(private router: Router) {
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

  login(user: User): void {
    this.user = user;
    window.localStorage.setItem('test-restoration-user', JSON.stringify(this.user));
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
    this.router.navigate(['authentication']);
  }
}
