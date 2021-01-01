import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {AuthService} from "../services/auth.service";



@Injectable()
export class AuthGuard implements CanActivateChild {

  constructor(private _router: Router,
              private _authService: AuthService) {
  }


  canActivateChild(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {
    return this._checkLogin(routerStateSnapshot.url);
  }

  private _checkLogin(activatedUrl: string) {

    if (this._authService.isLoggedIn && activatedUrl === '/auth/sign-in') {
      this._router.navigate(['students']);
      return false;
    }

    return true; // allow
  }
}
