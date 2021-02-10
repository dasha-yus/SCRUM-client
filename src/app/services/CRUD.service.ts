import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CRUDService {
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders().set(
    'x-auth-token',
    localStorage.getItem('token')
  );

  postRequest(url: string, data: Object) {
    return this.http
      .post(environment.BASE_URL + url, data, { headers: this.headers })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  getRequest(url: string) {
    return this.http
      .get(environment.BASE_URL + url, { headers: this.headers })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  putRequest(url: string, data: Object) {
    return this.http
      .put(environment.BASE_URL + url, data, { headers: this.headers })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  deleteRequest(url: string) {
    return this.http
      .delete(environment.BASE_URL + url, { headers: this.headers })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
