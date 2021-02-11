import {Component, OnDestroy, OnInit} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromToDoAction from '../store/to-do.action';
import ToDo from '../model/to-do.model';
import ToDoState from '../store/to-do.state';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit, OnDestroy {

  todo$: Observable<ToDoState>;
  ToDoSubscription: Subscription;
  ToDoList: ToDo[] = [];

  Title: string = '';
  IsCompleted: boolean = false;

  todoError: Error = null;



  constructor(private store: Store<{ todos: ToDoState }>) {
    this.todo$ = store.pipe(select('todos'));
  }

  ngOnInit(): void {
    this.ToDoSubscription = this.todo$
      .pipe(
        map(x => {
          console.log('ngOnInit: ', x);
          this.ToDoList = x.toDos;
          this.todoError = x.toDoError;
        })
      )
      .subscribe();

    this.store.dispatch(fromToDoAction.BeginGetToDoAction());
  }

  createToDo(): void {
    const todo: ToDo = { title: this.Title, completed: this.IsCompleted };
    this.store.dispatch(fromToDoAction.BeginCreateToDoAction({ payload: todo }));
    this.Title = '';
    this.IsCompleted = false;
  }

  ngOnDestroy(): void {
    if (this.ToDoSubscription) {
      this.ToDoSubscription.unsubscribe();
    }
  }
}
