import { redo, undo } from './lib/actions';
import createMiddleware from './lib/create_middleware';

export default {
  createMiddleware,
  redo,
  undo,
};
