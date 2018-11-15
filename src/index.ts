import { redo, REDO, undo, UNDO } from './lib/actions';
import createMiddleware from './lib/create_middleware';

export default {
  REDO,
  UNDO,
  createMiddleware,
  redo,
  undo,
};
