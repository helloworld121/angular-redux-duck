import ToDoState, {initializeState} from './to-do.state';
import {Action, createReducer, on} from '@ngrx/store';
import * as fromToDoAction from './to-do.action';
import ToDo from '../model/to-do.model';


export const intialState = initializeState();

const reducer = createReducer(
  intialState,
  on(fromToDoAction.GetToDoAction, state => state),
  on(fromToDoAction.CreateToDoAction, (state: ToDoState, todo: ToDo) => {
    return { ...state, toDos: [...state.toDos, todo], ToDoError: null };
  }),
  on(fromToDoAction.SuccessGetToDoAction, (state: ToDoState, { payload }) => {
    console.log('[ToDoReducer] SuccessGetToDoAction: ', payload);
    return { ...state, toDos: payload };
  }),
  on(fromToDoAction.SuccessCreateToDoAction, (state: ToDoState, { payload }) => {
    return { ...state, toDos: [...state.toDos, payload], ToDoError: null };
  }),
  on(fromToDoAction.ErrorToDoAction, (state: ToDoState, error: Error) => {
    console.log(error);
    return { ...state, ToDoError: error };
  })
);

export function ToDoReducer(state: ToDoState | undefined, action: Action) {
  return reducer(state, action);
}
