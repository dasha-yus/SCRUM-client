import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string;
  user: User;

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(user: User) {
    return this.http.post('http://localhost:5000/register', user).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  authUser(user: User) {
    return this.http.post('http://localhost:5000/login', user).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  storeUser(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('user_id', user.id);
    this.token = token;
    this.user = user;
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    this.router.navigate(['auth']);
  }

  isLoggedIn() {
    return tokenNotExpired();
  }
}
