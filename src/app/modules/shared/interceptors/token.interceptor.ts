import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';



/* This class is for defining authorization token into httpOptions headers object
 * which is passed to every HttpClient method automatically rather than the hard-coding
 * the token via httpOptions headers object in every HttpClient request.
 */

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(request);
  }
}
