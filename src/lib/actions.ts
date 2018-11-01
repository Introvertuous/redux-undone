export const UNDO = 'redux-undone/UNDO';
export const REDO = 'redux-undone/REDO';

export const undo = () => ({ type: UNDO });
export const redo = () => ({ type: REDO });
