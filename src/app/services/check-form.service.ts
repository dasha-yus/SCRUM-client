import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckFormService {
  constructor() {}

  checkName(name: string) {
    if (name == undefined) return false;
    else return true;
  }

  checkEmail(email: string) {
    if (email == undefined) return false;
    if (!/\S+@\S+\.\S+/.test(email)) return false;
    else return true;
  }

  checkPassword(password: string) {
    if (password == undefined) return false;
    else return true;
  }

  checkPasswordCheck(password: string, passwordCheck: string) {
    if (passwordCheck == undefined) return false;
    else if (password !== passwordCheck) return false;
    else return true;
  }
}
