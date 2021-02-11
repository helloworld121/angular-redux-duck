import ToDo from '../model/to-do.model';

export default class ToDoState {
  toDos: Array<ToDo>;
  toDoError: Error;
}

export const initializeState = (): ToDoState => {
  return {
    toDos: Array<ToDo>(),
    toDoError: null
  };
};
