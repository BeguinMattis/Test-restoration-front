import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @Input() module: string;
  user: User;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.authenticationService.getUser();
  }

  signOut(): void {
    this.authenticationService.signOut();
  }
}
