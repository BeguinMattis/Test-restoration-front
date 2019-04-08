import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(private authenticationService: AuthenticationService,
              private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authenticationService.getUser();
  }

  signOut(): void {
    this.authenticationService.signOut();
    this.authService.signOut();
  }
}
