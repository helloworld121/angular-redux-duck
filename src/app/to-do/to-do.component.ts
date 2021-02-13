import {Component, OnDestroy, OnInit} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromToDoAction from '../store/to-do.action';
import ToDo from '../model/to-do.model';
import ToDoState from '../store/to-do.state';
import {ToDoHttpService} from "../service/to-do.httpservice";
import {ToDoDuckStore} from "../store-ducked/to-do.duck.store";

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



  constructor(
    private toDoDuckStore: ToDoDuckStore,
    private store: Store<{ todos: ToDoState }>) {
    this.todo$ = store.pipe(select('todos'));
  }

  ngOnInit(): void {
    console.log('[ToDoComponent].ToDoDuckStore', this.toDoDuckStore);

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
    // const todo: ToDo = { title: this.Title, completed: this.IsCompleted };
    const todo: ToDo = new ToDo(this.Title, this.IsCompleted);
    console.log('[ToDoComponent]ToDo:', todo);
    // the Decorator add these fields, but compiler doesn't recognize
    // console.log('[ToDoComponent]ToDo.id:', todo.id);
    // console.log('[ToDoComponent]ToDo.created:', todo.created);
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
