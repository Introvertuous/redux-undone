import merge from 'deepmerge';
import get from 'lodash.get';
import ActionTransformer from './action_transformer';
import { UNDO, REDO } from './types';

const history = { past: [], future: [] };

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

    const dispatch = action => {
      if (typeof action === 'function') {
        return action(dispatch, store.getState);
      }

      const methodsOrTargetAction = transformers[action.type];
      oppositeEntries.push(
        new ActionTransformer(store.getState(), action, methodsOrTargetAction)
      );

      return store.dispatch(
        merge(action, { meta: { reduxUndone: { skip: true } } })
      );
    };

    const transformer = activeEntries.pop();
    return transformer.performTransformation(store.getState(), dispatch);
  }

  const methodsOrTargetAction = transformers[action.type];

  if (get(action, 'meta.reduxUndone.skip') || !methodsOrTargetAction) {
    return next(action);
  }

  const state = store.getState();
  history.future = [];
  history.past.push(
    new ActionTransformer(state, action, methodsOrTargetAction)
  );
  return next(action);
};
