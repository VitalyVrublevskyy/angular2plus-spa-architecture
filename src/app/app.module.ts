import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TodoService } from './providers/todo.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.service';
import { LoginComponent } from './pages/login/login.component';
import { TodoListComponent } from './pages/todo/todo-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CustomInterceptor } from './providers/custom-interceptor';

@NgModule({
  declarations: [
    /*Pages*/
    AppComponent,
    LoginComponent,
    TodoListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    TodoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor ,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
