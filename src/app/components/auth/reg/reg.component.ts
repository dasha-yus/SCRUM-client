import { Component, OnInit } from '@angular/core';
import { CheckFormService } from '../../../services/check-form.service';
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
    private checkForm: CheckFormService,
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

    if (!this.checkForm.checkName(user.name)) {
      this.flashMessages.show('The username is not provided', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
      return false;
    } else if (!this.checkForm.checkEmail(user.email)) {
      this.flashMessages.show(
        'The email is not provided or it has an incorrect format',
        {
          cssClass: 'alert-danger',
          timeout: 4000,
        }
      );
      return false;
    } else if (!this.checkForm.checkPassword(user.password)) {
      this.flashMessages.show('The password is not provided', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
      return false;
    } else if (
      !this.checkForm.checkPasswordCheck(user.password, user.passwordCheck)
    ) {
      this.flashMessages.show('Passwords does not match', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
      return false;
    }

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
