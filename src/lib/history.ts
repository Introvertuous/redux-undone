import { ThunkOrAction } from 'types/redux';

export default class History<S> {
  private future: Array<() => ThunkOrAction<S>>;
  private past: Array<() => ThunkOrAction<S>>;

  constructor() {
    this.future = [];
    this.past = [];
  }

  public clearFuture() {
    this.future = [];
  }

  public getPast() {
    return Object.freeze(this.past);
  }

  public pop(past: boolean) {
    if (past) {
      return this.past.pop();
    }
    return this.future.pop();
  }

  public push(transformer: () => ThunkOrAction<S>, past: boolean = true) {
    if (past) {
      return this.past.push(transformer);
    }
    return this.future.push(transformer);
  }
}
