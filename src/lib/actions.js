import { UNDO, REDO } from './types';

export const undo = () => ({ type: UNDO });
export const redo = () => ({ type: REDO });
