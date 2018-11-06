import { Action, AnyAction, Dispatch, Store } from 'redux';
import { ThunkOrAction } from 'types/redux';
import { ITransformers } from 'types/transform';
import { hasOne } from 'utils/has';
import merge from 'utils/merge';
import { REDO, UNDO } from './actions';
import History from './history';
import logger from './logger';

const globallySkippedProperties = ['meta.reduxUndone.skip'];

function dispatch<S>(store: Store<S>, action: ThunkOrAction<S>) {
  if (typeof action === 'function') {
    return action(dispatch.bind(null, store), store.getState);
  }

  const nonUndoableAction = merge(action, {
    meta: { reduxUndone: { skip: true } },
  }) as AnyAction;

  store.dispatch(nonUndoableAction);
  return nonUndoableAction;
}

function processAction<S>(
  store: Store<S>,
  next: Dispatch,
  action: ThunkOrAction<S>
) {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  return next(action);
}

function performDispatch<S>(store: Store<S>, action: ThunkOrAction<S>) {
  const oldState = store.getState();
  const dispatchedAction = dispatch(store, action);
  const newState = store.getState();
  return { oldState, newState, dispatchedAction };
}

interface IOptions {
  skippedProperties?: any[];
}

function createTransformer<S>(
  transformers: ITransformers<S>,
  store: Store<S>,
  action: ThunkOrAction<S>,
  undoing: boolean
) {
  const { oldState, newState, dispatchedAction } = performDispatch(
    store,
    action
  );

  const transformer = transformers[dispatchedAction.type];
  if (!transformer) {
    logger.log(`No transformation found for ${dispatchedAction.type}`, 'warn');
    return null;
  }

  return () => transformer(oldState, newState, dispatchedAction, undoing);
}

function createMiddleware<S>(
  transformers: ITransformers<S>,
  options: IOptions = {}
) {
  const history = new History<S>();
  return (store: Store<S>) => (next: Dispatch) => (
    action: ThunkOrAction<S>
  ) => {
    const type = (action as Action<string>).type;

    if (type === UNDO || type === REDO) {
      const undoing = type === UNDO;

      const prevTransformer = history.pop(undoing);
      if (prevTransformer == null) {
        return;
      }

      const transformed = prevTransformer();
      const transformer = createTransformer(
        transformers,
        store,
        transformed,
        undoing
      );
      if (transformer === null) {
        return;
      }

      history.push(transformer, !undoing);
      return;
    }

    const { skippedProperties } = options;
    if (
      hasOne(action, [
        ...globallySkippedProperties,
        ...(skippedProperties || []),
      ])
    ) {
      processAction(store, next, action);
      return;
    }

    const transformer = createTransformer(transformers, store, action, true);
    if (transformer === null) {
      return;
    }

    history.clearFuture();
    history.push(transformer);
  };
}

export default createMiddleware;
