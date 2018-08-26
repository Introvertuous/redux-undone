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
  const createDispatch = undoneFrom => {
    const dispatch = action => {
      if (typeof action === 'function') {
        return action(dispatch, store.getState);
      }
      return store.dispatch({ ...action, undoneFrom });
    };
    return dispatch;
  };

  const { type, payload, undoneFrom } = action;

  if (type === undoType || type === redoType) {
    const which = type === undoType ? 'past' : 'future';
    const category = history[which];
    if (category.length === 0) {
      return;
    }

    const entry = category.pop();
    const transformer = transformers[entry.type];
    const transformed = transformer.set(
      { getState: store.getState, dispatch: createDispatch(which) },
      entry.payload
    );

    if (!transformed) {
      return;
    }

    return next(transformed);
  }

  const transformer = transformers[type];

  if (!!undoneFrom) {
    const which = undoneFrom === 'past' ? 'future' : 'past';
    const category = history[which];
    category.push({
      type: type,
      payload: transformer.get(store, payload),
    });
    return next(action);
  }

  if (!transformer) {
    return next(action);
  }

  history.future = [];
  history.past.push({
    type,
    payload: transformer.get(store, payload),
  });
  return next(action);
};
