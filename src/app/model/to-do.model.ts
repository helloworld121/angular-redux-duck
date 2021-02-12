import {IdGenerator} from '../decorator/id-class.decorator';

@IdGenerator()
export default class ToDo {

  // title: string;
  // completed: boolean;
  constructor(public title: string, public completed: boolean) {
    console.log(this);
  }

}
