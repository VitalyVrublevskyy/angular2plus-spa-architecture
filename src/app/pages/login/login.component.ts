import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { Role } from '../../enum/role.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService,
              private router: Router) { }

  loginUser() {
    this.authService.userRole = Role.User;
    this.router.navigate(['/dashboard']);
  }

  loginAdmin() {
    this.authService.userRole = Role.Admin;
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.authService.userRole = null;
  }

}
