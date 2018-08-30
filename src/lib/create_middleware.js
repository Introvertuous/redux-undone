import merge from 'deepmerge';
import get from 'lodash.get';
import ActionTransformer from './action_transformer';
import { UNDO, REDO } from './types';

const history = { past: [], future: [] };

export default transformers => store => next => action => {
  const dispatch = action => {
    if (typeof action === 'function') {
      return action(dispatch, store.getState);
    }

    return store.dispatch(
      merge(action, { meta: { reduxUndone: { skip: true } } })
    );
  };

  const dispatchAndCreateTransformer = action => {
    const oldState = store.getState();
    const dispatchedAction = dispatch(action);
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
  };

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
    const transformed = transformer.getTransform(store.getState());
    const nextTransformer = dispatchAndCreateTransformer(transformed);
    oppositeEntries.push(nextTransformer);
    return;
  }

  if (get(action, 'meta.reduxUndone.skip')) {
    return next(action);
  }

  history.future = [];
  try {
    const nextTransformer = dispatchAndCreateTransformer(action);
    history.past.push(nextTransformer);
  } catch (err) {
    return next(action);
  }
};
