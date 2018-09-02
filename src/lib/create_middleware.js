import merge from '../utils/merge';
import has from '../utils/has';
import ActionTransformer from './action_transformer';
import { UNDO, REDO } from './types';

const history = { past: [], future: [] };

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
    let activeEntries = [];
    let oppositeEntries = [];

    if (action.type === UNDO) {
      activeEntries = history.past;
      oppositeEntries = history.future;
    } else {
      activeEntries = history.future;
      oppositeEntries = history.past;
    }

    if (activeEntries.length === 0) {
      return;
    }

    const transformer = activeEntries.pop();
    const state = store.getState();
    const transformed = transformer.getTransform(state);
    const nextTransformer = dispatchAndCreateTransformer(
      store,
      transformers,
      transformed
    );
    oppositeEntries.push(nextTransformer);
    return;
  }

  if (has(action, 'meta.reduxUndone.skip')) {
    return processAction(store, next, action);
  }

  history.future = [];
  try {
    const nextTransformer = dispatchAndCreateTransformer(
      store,
      transformers,
      action
    );
    history.past.push(nextTransformer);
  } catch (err) {
    return processAction(store, next, action);
  }
};
