import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from './types';
import {
  attemptRemoveTodo,
  attemptAddTodo,
  attemptUpdateTodo,
} from './actions';
import { getTodo } from './selectors';

export default {
  [ADD_TODO]: {
    set: (store, payload) => {
      store.dispatch(attemptRemoveTodo(payload));
    },
    get: (store, { value }) => value,
  },

  [REMOVE_TODO]: {
    set: (store, { value, index }) => {
      store.dispatch(attemptAddTodo(value, index));
    },
    get: (store, payload) => {
      const state = store.getState();
      const { value } = getTodo(state, payload);
      return { value, index: payload };
    },
  },

  [UPDATE_TODO]: {
    set: (store, { value, done }) => {
      store.dispatch(attemptUpdateTodo(value, done));
    },
    get: (store, { index }) => {
      const state = store.getState();
      return getTodo(state, index);
    },
  },
};
