import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {from, Observable} from 'rxjs';
import ToDo from '../model/to-do.model';
import {LogMethod} from '../decorator/log-method.decorator';

@Injectable({
  providedIn: 'root'
})
export class ToDoHttpService {
  private ApiURL: string = 'https://localhost:44308/api/ToDo';

  private dummyToDos: Array<ToDo> = [
    {title: 'First Title', completed: true},
    {title: 'Next Title', completed: true}
  ];

  constructor(private httpclient: HttpClient) {
    console.log('init ToDoHttpService');
  }

  getToDos(): Observable<ToDo[]> {
    // return this.httpclient.get<ToDo[]>(this.ApiURL);
    return from([this.dummyToDos]);
  }

  @LogMethod()
  createToDos(payload: ToDo): Observable<ToDo> {
    this.dummyToDos.push(payload);

    return this.httpclient.post<ToDo>(this.ApiURL, JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
