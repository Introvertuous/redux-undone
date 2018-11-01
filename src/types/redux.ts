import { Action, Dispatch } from 'redux';

export type Thunk<S> = (
  dispatch: Dispatch,
  getState: () => S
) => Action<string>;

export type ThunkOrAction<S> = Thunk<S> | Action<string>;
