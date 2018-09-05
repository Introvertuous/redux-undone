import merge from '../utils/merge';
import has from '../utils/has';
import ActionTransformer from './action_transformer';
import { UNDO, REDO } from './types';
import history from './history';

function dispatch(store, action) {
  if (typeof action === 'function') {
    return action(dispatch.bind(null, store), store.getState);
  }

  return store.dispatch(
    merge(action, { meta: { reduxUndone: { skip: true } } })
  );
}

function processAction(store, next, action) {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }

  return next(action);
}

function dispatchAndCreateTransformer(store, transformers, action) {
  const oldState = store.getState();
  const dispatchedAction = dispatch(store, action);
  const newState = store.getState();

  const transformerMethods = transformers[dispatchedAction.type];
  if (!transformerMethods) {
    throw new Error(`No transformation methods found for ${action.type}`);
  }

  const transformer = new ActionTransformer(
    dispatchedAction,
    transformerMethods
  );
  transformer.collect(oldState, newState);
  return transformer;
}

export default transformers => store => next => action => {
  if (action.type === UNDO || action.type === REDO) {
    const active = action.type === UNDO;
    const opposite = !active;

    const transformer = history.pop(active);
    if (transformer == null) {
      return;
    }

    const state = store.getState();
    const transformed = transformer.getTransform(state);
    const nextTransformer = dispatchAndCreateTransformer(
      store,
      transformers,
      transformed
    );
    history.push(opposite, nextTransformer);
    return;
  }

  if (has(action, 'meta.reduxUndone.skip')) {
    return processAction(store, next, action);
  }

  try {
    const nextTransformer = dispatchAndCreateTransformer(
      store,
      transformers,
      action
    );
    history.clearFuture();
    history.push(true, nextTransformer);
  } catch (err) {
    return;
  }
};
