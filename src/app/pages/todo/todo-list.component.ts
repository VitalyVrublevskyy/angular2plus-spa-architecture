import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../providers/todo.service';
import { Todo } from '../../model/todo';
import { Mode } from '../../enum/mode';
import { AuthService } from '../../providers/auth.service';
import { Role } from '../../enum/role.enum';
import {Router} from "@angular/router";

@Component({
  selector: 'todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['todo-list.component.scss']
})


export class TodoListComponent implements OnInit {
  mode: Mode;

  newTodoText: string;

  Mode = Mode;

  Role = Role;

  private _items: Todo[];

  get remainingCount(): number {
    return this._items.filter(item => !item.completed).length;
  }

  get completedCount(): number {
    return this._items.filter(item => item.completed).length;
  }

  get isAllCompleted(): boolean {
    return this._items.every(item => item.completed);
  }

  get items(): Todo[] {
    switch (this.mode) {
      case Mode.Completed:
        return this._items.filter(item => item.completed);
      case  Mode.Active:
        return this._items.filter(item => !item.completed);
      default:
        return this._items;
    }
  }


  constructor(public authService: AuthService,
              public service: TodoService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadList();
  }


  add(text: string) {
    if (text.trim().length > 0) {
      const item: Todo = new Todo();
      item.title = text.trim();
      this.service.add(item)
        .subscribe((model: Todo) => this._items.push(model));
    }
  }

  toggleCompletion(item: Todo) {
    item.completed = !item.completed;
    this.service.update(item)
      .subscribe();
  }

  removeItem(items: Todo) {
    this.service.remove(items.id)
      .subscribe(() => this.loadList());
  }

  removeCompleted() {
    const ids: number[] = this._items
      .filter(item => item.completed)
      .map(item => item.id);

    this.service.removeMultiple(ids)
      .subscribe(() => this.loadList());
  }

  stopEditing(todo: Todo, editedTitle: string) {
    todo.title = editedTitle;
    todo.editing = false;
  }


  updateEditingTodo(item: Todo, editedTitle: string) {
    if (this.authService.userRole === Role.Admin) {
      return; // Exit
    }

    item.editing = false;
    if (editedTitle.trim().length === 0) {
      this.service.remove(item.id).subscribe();
    } else {
      item.title = editedTitle;
      this.service.update(item).subscribe();
    }
  }

  logout() {
    this.authService.userRole = null;
    this.router.navigateByUrl('');
  }

  private loadList() {
    this.service.getListOfLocalItems()
      .subscribe(items => this._items = items);
  }
}
