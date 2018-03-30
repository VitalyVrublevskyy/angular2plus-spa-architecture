import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Role } from '../enum/role.enum';
import { HttpClient } from '@angular/common/http';

/**
 * Global service to handle user
 * */

@Injectable()
export class AuthService {

  private _userRole: Role;
  get userRole(): Role {
    return this._userRole;
  }
  set userRole(value: Role) {
    this._userRole = value;
    const role: string = JSON.stringify(value);
    localStorage.setItem('user-role', role);
  }

  constructor(private http: HttpClient) {
  }

  /*
  * Fetch session user info once.
  * */
  isLoggedIn(): Observable<boolean> {
    if (this._userRole) {
      return Observable.of(true);
    }

    const raw: string = localStorage.getItem('user-role');
    const role: Role = JSON.parse(raw);
    return role
      ? Observable.of(true)
      : Observable.throw(new Error('Forbidden Page'));
  }
}
