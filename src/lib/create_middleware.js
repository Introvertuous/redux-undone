import merge from '../utils/merge';
import has from '../utils/has';
import ActionTransformer from './action_transformer';
import { UNDO, REDO } from './types';
import history from './history';

const skippedProperties = ['meta.reduxUndone.skip'];

function hasOneOf(obj, properties) {
  for (let i = 0; i < properties.length; i++) {
    if (has(obj, properties[i])) {
      return true;
    }
  }
  return false;
}

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

function performDispatch(store, action) {
  const oldState = store.getState();
  const dispatchedAction = dispatch(store, action);
  const newState = store.getState();
  return { oldState, newState, dispatchedAction };
}

function createTransformer(action, methods, oldState, newState) {
  const transformer = new ActionTransformer(action, methods);
  transformer.collect(oldState, newState);
  return transformer;
}

export default (transformers, options = {}) => store => next => action => {
  if (action.type === UNDO || action.type === REDO) {
    const active = action.type === UNDO;
    const opposite = !active;

    const transformer = history.pop(active);
    if (transformer == null) {
      return;
    }

    const state = store.getState();
    const transformed = transformer.getTransform(state);

    const { oldState, newState, dispatchedAction } = performDispatch(
      store,
      transformed
    );

    const methods = transformers[dispatchedAction.type];
    if (!methods) {
      throw new Error(
        `No transformation methods found for ${dispatchedAction.type}`
      );
    }

    const nextTransformer = createTransformer(
      dispatchedAction,
      methods,
      oldState,
      newState
    );

    history.push(opposite, nextTransformer);
    return;
  }

  if (
    hasOneOf(action, [
      ...skippedProperties,
      ...(options.skippedProperties || []),
    ])
  ) {
    return processAction(store, next, action);
  }

  const { oldState, newState, dispatchedAction } = performDispatch(
    store,
    action
  );

  const methods = transformers[dispatchedAction.type];
  if (!methods) {
    return;
  }

  const nextTransformer = createTransformer(
    dispatchedAction,
    methods,
    oldState,
    newState
  );

  history.clearFuture();
  history.push(true, nextTransformer);
};
