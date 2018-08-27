export const UNDO = 'UNDO';
export const REDO = 'REDO';

export const undo = () => ({ type: UNDO });
export const redo = () => ({ type: REDO });

const history = {
  past: [],
  future: [],
};

export default ({
  undoType = UNDO,
  redoType = REDO,
  transformers,
}) => store => next => action => {
  const { type, payload, skipReduxUndone } = action;

  const createDispatch = undoneFrom => {
    const category = undoneFrom === 'past' ? 'future' : 'past';
    const entries = history[category];

    const dispatch = action => {
      if (typeof action === 'function') {
        return action(dispatch, store.getState);
      }

      const transformer = transformers[action.type];

      entries.push({
        type: action.type,
        payload: transformer.get(store.getState(), action.payload),
      });

      return store.dispatch({ ...action, skipReduxUndone: true });
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

  if (!!skipReduxUndone || !transformer) {
    return next(action);
  }

  history.future = [];
  history.past.push({
    type,
    payload: transformer.get(store.getState(), payload),
  });
  return next(action);
};
