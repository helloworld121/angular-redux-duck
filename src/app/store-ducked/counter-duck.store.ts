import {Duck} from '../ducking/duck.decorator';
import {DuckPair} from '../ducking/duck-pair.decorator';
import {Effect} from "@ngrx/effects";

export interface CounterState {
  counter: number;
  loading: boolean;
}

@Duck<CounterState>(
  {
    counter: 0,
    loading: false
  })
export class CounterDuckStore {


  @DuckPair('[ToDoDuckStore] createToDoAction')
  updateCounterAction(state: CounterState, newCounter: number) {
    return { ...state, counter: newCounter };
  }

  @Effect
  methode

}
