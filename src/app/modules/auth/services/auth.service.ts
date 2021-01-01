import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { User } from '../components/authentication/sign-in/sign-in.component';

@Injectable()
export class AuthService {
  constructor(private _httpClient: HttpClient, private _router: Router) {}

  login(requestData: User) {
    // account credentials of Gigi
    // requestData = {
    //   "username": "giorgi.nikolaishvili25@gmail.com",
    //   "password": "gigi25"
    // };
    return this._httpClient
      .get(
        `/api/accounts?username=${requestData.username}&password=${requestData.password}`,
      )
      .pipe(
        map((users: User[]) => {
          if (users.length) {
            this.saveUserSessionData(users[0]);
            return users[0];
          }
          return null;
        }),
        catchError(this.handleUnauthorizedError()),
      );
  }

  logout() {
    this._clearUserSessionData();
    this._router.navigate(['auth']);
  }

  changePassword(data: any) {
    return this._httpClient.patch(`/api/accounts/${data.id}`, {
      password: data.new_password,
    });
  }

  public handleUnauthorizedError() {
    return (errorResponse: any) => {
      if (errorResponse.status === 401) {
        // "Unauthorized" error
        this._clearUserSessionData();
        this._router.navigate(['']); // index route is 'students'
      }
      return throwError(errorResponse.error);
    };
  }

  saveUserSessionData(user: User) {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  private _clearUserSessionData() {
    localStorage.clear();
  }

  get getLoggedInUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

  get isAdmin(): boolean {
    if (!this.isLoggedIn) {
      return;
    }
    return this.getLoggedInUser.admin;
  }
}
