import { ThunkOrAction } from './redux';

export type Transformer<S> = (
  action: ThunkOrAction<S>,
  prevState: S,
  nextState: S,
  undoing: boolean
) => ThunkOrAction<S>;

export interface ITransformers<S> {
  [x: string]: Transformer<S>;
}
