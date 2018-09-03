import { undo, redo } from './lib/actions';
import createMiddleware from './lib/create_middleware';
import history from './lib/history';

export default {
  undo,
  redo,
  createMiddleware,
  history,
};
