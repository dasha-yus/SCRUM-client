import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthData } from '../../models/auth-data';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  userLoginClick() {
    const user: User = {
      email: this.email,
      password: this.password,
    };

    this.authService.authUser(user).subscribe(
      (data: AuthData) => {
        this.router.navigate(['/']);
        this.authService.storeUser(data.token, data.user);
      },
      (err) => {
        this.flashMessages.show(err.error.msg, {
          cssClass: 'alert-danger',
          timeout: 2000,
        });
      }
    );
  }
}
