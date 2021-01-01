import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/components/authentication/sign-in/sign-in.component';
import * as moment from 'moment';

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

  search(data?: any) {
    console.log('data', data);
    // return this._httpClient.post('/api/users/list', data);
    let requestUrl = '/api/students?';
    if (data.admin) {
      requestUrl = requestUrl.concat(`admin=${data.admin}`);
    }
    if (data.is_employed) {
      requestUrl = requestUrl.concat(`&is_employed=${data.is_employed}`);
    }
    if (data.start_date) {
      requestUrl = requestUrl.concat(
        `&apply_date_gte=${moment(data.start_date).format('YYYY-MM-DD')}`,
      );
    }
    if (data.end_date) {
      requestUrl = requestUrl.concat(
        `&graduate_date_lte=${moment(data.end_date).format('YYYY-MM-DD')}`,
      );
    }
    return this._httpClient.get(requestUrl);
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

  addOrEditWorkExperience(data: object) {
    return this._httpClient.patch(`/api/users/${data['user'].id}`, data);
  }

  addWorkExperience(data: any) {
    return this._httpClient.patch(`/api/students/${data.studentId}`, {
      user_portfolios: [
        ...data.studentInfo.user_portfolios,
        {
          ...data.newWorkExperience,
          id:
            data.studentInfo.user_portfolios[
              data.studentInfo.user_portfolios.length - 1
            ].id + 1,
        },
      ],
    });
  }

  deleteWorkExperience(data: any) {
    return this._httpClient.patch(`/api/students/${data.studentId}`, {
      user_portfolios: data.studentInfo.user_portfolios.filter(
        (portfolio) => portfolio.id !== data.workExperienceId,
      ),
    });
  }

  modifyHobbies(data: any) {
    return this._httpClient.patch(`/api/students/${data.user_id}`, {
      hobby: data.hobby,
    });
  }

  sendMail(data: object) {
    return this._httpClient.post('/api/users/send_mail', data);
  }

  uploadProfilePhoto(data: object) {
    return this._httpClient.put(`/api/users/${data['id']}`, data);
  }
}
