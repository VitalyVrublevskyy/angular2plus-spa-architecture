import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Todo } from '../model/todo';
import { HttpClient } from '@angular/common/http';


export const apiUrl = 'https://floating-fjord-98973.herokuapp.com/todo';

/**
 * This class provides the TodoList service with methods to read  and add new todoitem.
 */
@Injectable()
export class TodoService {
  /**
   * Creates a new Service with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: HttpClient) {
  }

  getListOfLocalItems(): Observable<Todo[]> {
    return this.http.get<Todo[]>(apiUrl)
      .map(items => items.map(item => new Todo(item)));
  }


  add(item: Todo): Observable<Todo> {
    return this.http.post<Todo>(apiUrl, item.serialize())
      .map(data => new Todo(data))
      .catch(err => this.handleError(err));
  }

  update(item: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${apiUrl}/${item.id}`, item.serialize());
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/${id}`)
      .catch(err => this.handleError(err));
  }

  removeMultiple(ids: number[]): Observable<boolean> {
    const requests = ids.map(id => this.remove(id));
    return Observable.forkJoin(...requests)
      .map(resp => !!resp);
  }

  /**
   * Handle HTTP error
   */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg: any = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

