import { ThunkOrAction } from './redux';

export type Transformer<S> = (
  prevState: S,
  nextState: S,
  action: ThunkOrAction<S>
) => ThunkOrAction<S>;

export interface ITransformers<S> {
  [x: string]: Transformer<S>;
}
