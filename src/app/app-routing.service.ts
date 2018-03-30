import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './pages/todo/todo-list.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './providers/guards/auth.guard';
import { AuthService } from './providers/auth.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  }, {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: TodoListComponent
  }, {
    path: '**',
    pathMatch: 'full',
    component: LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class AppRoutingModule {
}
