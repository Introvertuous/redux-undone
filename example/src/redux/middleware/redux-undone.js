export const UNDO = 'UNDO';
export const REDO = 'REDO';

export const undo = () => ({ type: UNDO });
export const redo = () => ({ type: REDO });

const past = [];

export default ({
  undoType = UNDO,
  redoType = REDO,
  transformers,
}) => store => next => action => {
  if (action.skipHistory) {
    return next(action);
  }

  const dispatch = action => {
    if (typeof action === 'function') {
      return action(dispatch, store.getState);
    }
    return store.dispatch({ ...action, skipHistory: true });
  };

  if (action.type === undoType) {
    if (past.length === 0) {
      return;
    }

    const pastEntry = past.pop();
    const transformer = transformers[pastEntry.type];
    const transformed = transformer.set(
      { getState: store.getState, dispatch },
      pastEntry.payload
    );

    if (!transformed) {
      return;
    }

    return next(transformed);
  }

  const transformer = transformers[action.type];

  if (!transformer) {
    return next(action);
  }

  past.push({
    type: action.type,
    payload: transformer.get(store, action.payload),
  });
  return next(action);
};
