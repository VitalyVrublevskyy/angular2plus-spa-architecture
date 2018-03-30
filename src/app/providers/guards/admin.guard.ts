import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../auth.service';
import { Role } from '../../enum/role.enum';


/**
 * Handle Admin role Permissions
 * Handle session users permission base on his role and permission for some action
 * -
 * From myself: Want to demonstrate OOP inheritance, and decorate some logic in child class
* */

@Injectable()
export class AdminGuard extends AuthGuard implements CanActivate {
  constructor(protected authService: AuthService,
              protected router: Router) {

    super(authService, router);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return super.canActivate(route, state)
      .map(isLoggedIn => isLoggedIn && this.checkPermissions());
  }

  private checkPermissions(): boolean {
    return this.authService.userRole === Role.Admin;
  }
}
