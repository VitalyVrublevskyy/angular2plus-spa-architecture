import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';

/**
 * Single responsibility for this guard to verify if user already logged in
 * */

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(protected authService: AuthService,
              protected router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn()
      .catch(err => {
        this.router.navigate(['/']); // LOGIN Page
        return Observable.throw(err);
      });
  }
}
