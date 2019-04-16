import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.authenticationService.getUser();
  }

  signOut(): void {
    this.authenticationService.signOut();
  }
}
