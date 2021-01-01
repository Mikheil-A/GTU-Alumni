import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {AuthService} from "../../auth/services/auth.service";



@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private _router: Router,
              private _authService: AuthService) {
  }


  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {

    if (this._authService.isLoggedIn) {
      return true; // allow access if a user is logged in
    }

    this._router.navigate(['auth/sign-in']);
    return false;
  }
}
