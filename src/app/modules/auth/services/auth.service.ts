import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Router} from "@angular/router";
import {throwError} from "rxjs";



@Injectable()
export class AuthService {

  constructor(private _httpClient: HttpClient,
              private _router: Router) {
  }


  login(requestData: { email: string; password: string }) {
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json'
      // 'Authorization': '' // empty token at first
    });
    const options: object = {
      // headers: headers,
      observe: 'response' // to display the full response including headers
    };

    // requestData = {
    //   "email": "giorgi.nikolaishvili25@gmail.com",
    //   "password": "gigi25"
    // };

    return this._httpClient.post('/api/auth/login', requestData, options).pipe(
      map(res => {
        if (res['status'] === 200) {
          this.saveUserSessionData(res['body'].token, res['body'].user_id);
          return res['body'];
        }
      }),
      catchError(this.handleUnauthorizedError())
    );
  }

  logout() {
    this._clearUserSessionData();
    this._router.navigate(['auth']);
  }

  changePassword(data: object) {
    return this._httpClient.post('/api/users/password_reset', data);
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

  saveUserSessionData(token?: string, userId?: number, loggedInUserData?: object) {
    if (token) {
      localStorage.setItem('access_token', token);
    }
    if (userId) {
      localStorage.setItem('user_id', userId.toString());
    }
    if (loggedInUserData) {
      localStorage.setItem('userData', JSON.stringify(loggedInUserData));
      // if (loggedInUserData['profile']) {
      //   localStorage.setItem('profile_id', JSON.stringify(loggedInUserData['profile'].id));
      // }
    }
  }

  private _clearUserSessionData() {
    localStorage.clear();
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('access_token') ? true : false;
  }

  get isAdmin(): boolean {
    if (!this.isLoggedIn) {
      return;
    }
    let profile = JSON.parse(localStorage.getItem('userData'));
    // let profile = JSON.parse(localStorage.getItem('profile_id'));
    // return profile === 2; // if profile_id is 2, it's admin
    if (!profile) {
      setTimeout(() => {
        profile = JSON.parse(localStorage.getItem('userData'));
      }, 750);
      if (profile)
        return profile.profile_id === 2;
    } else {
      return profile.profile_id === 2;
    }
  }
}
