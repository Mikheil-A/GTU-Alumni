import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/components/authentication/sign-in/sign-in.component';

@Injectable()
export class StudentsService {
  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService,
  ) {}

  /**
   * TODO: create an interceptor:
   * https://www.google.com/search?client=firefox-b-d&q=unauthorized+interceptor+angular
   * https://blog.angularindepth.com/top-10-ways-to-use-interceptors-in-angular-db450f8a62d6
   * https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
   * https://stackoverflow.com/questions/46017245/how-to-handle-unauthorized-requestsstatus-with-401-or-403-with-new-httpclient
   */

  search(data?: object) {
    // return this._httpClient.post('/api/users/list', data);
    return this._httpClient.get('/api/students');
  }

  add(data: object) {
    return this._httpClient.post('/api/students', data);
  }

  update(data: object) {
    return this._httpClient.patch(`/api/students/${data['id']}`, data);
  }

  delete(studentId: number) {
    return this._httpClient.delete(`/api/students/${studentId}`);
  }

  getStudent(userId: string) {
    return this._httpClient.get(`/api/students/?id=${userId}`).pipe(
      catchError(this._authService.handleUnauthorizedError()), // TODO: do it using interceptor to check in every http request!!!!!
    );
  }

  addOrEditOrDeleteWorkExperience(data: object) {
    return this._httpClient.put(`/api/users/${data['user'].id}`, data);
  }

  modifyHobbies(data: object) {
    return this._httpClient.put(`/api/users/${data['user_id']}`, data);
  }

  sendMail(data: object) {
    return this._httpClient.post('/api/users/send_mail', data);
  }

  uploadProfilePhoto(data: object) {
    return this._httpClient.put(`/api/users/${data['id']}`, data);
  }
}
