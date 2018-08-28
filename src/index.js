import get from 'lodash.get';
import merge from 'deepmerge';

export const UNDO = 'UNDO';
export const REDO = 'REDO';

export const undo = () => ({ type: UNDO });
export const redo = () => ({ type: REDO });

const history = {
  past: [],
  future: [],
};

export const createMiddleware = ({
  undoType = UNDO,
  redoType = REDO,
  transformers,
}) => store => next => action => {
  const { type, payload } = action;

  const createDispatch = undoneFrom => {
    const category = undoneFrom === 'past' ? 'future' : 'past';
    const entries = history[category];

    const dispatch = action => {
      if (typeof action === 'function') {
        return action(dispatch, store.getState);
      }

      const transformer = transformers[action.type];
      const state = store.getState();
      entries.push({
        type: action.type,
        payload: transformer.get(state, action.payload),
      });

      return store.dispatch(
        merge(action, { meta: { reduxUndone: { skip: true } } })
      );
    };

    return dispatch;
  };

  if (type === undoType || type === redoType) {
    const category = type === undoType ? 'past' : 'future';
    const entries = history[category];
    if (entries.length === 0) {
      return;
    }

    const entry = entries.pop();
    const transformer = transformers[entry.type];
    const dispatch = createDispatch(category);
    const transformed = transformer.set(dispatch, entry.payload);

    if (!transformed) {
      return;
    }

    return dispatch(transformed);
  }

  const transformer = transformers[type];

  if (get(action, 'meta.reduxUndone.skip') || !transformer) {
    return next(action);
  }

  const state = store.getState();
  history.future = [];
  history.past.push({
    type,
    payload: transformer.get(state, payload),
  });
  return next(action);
};
