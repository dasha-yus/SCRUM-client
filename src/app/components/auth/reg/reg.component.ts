import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { User } from '../../../models/user';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class RegComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;

  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  userRegisterClick() {
    const user: User = {
      name: this.name,
      email: this.email,
      password: this.password,
      passwordCheck: this.passwordCheck,
    };

    this.authService.registerUser(user).subscribe(
      (data: any) => {
        this.router.navigate(['/auth']);
        alert(data.msg);
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
