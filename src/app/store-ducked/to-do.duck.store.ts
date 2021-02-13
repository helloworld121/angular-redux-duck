import ToDo from '../model/to-do.model';
import ToDoState from '../store/to-do.state';
import {Duck} from '../ducking/duck.decorator';
import {DuckPair} from '../ducking/duck-pair.decorator';

@Duck<ToDoState>(
  {
    toDos: Array<ToDo>(),
    toDoError: null
  })
export class ToDoDuckStore {


  @DuckPair('[ToDoDuckStore] createToDoAction')
  createToDoAction(state: ToDoState, payload: ToDo) {
    return { ...state, count: payload };
  }

}
