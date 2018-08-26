import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from './types';
import { attemptRemoveTodo, attemptAddTodo } from './actions';
import { getTodo } from './selectors';

export default {
  [ADD_TODO]: {
    set: (store, payload) => {
      store.dispatch(attemptRemoveTodo(payload));
    },
    get: (store, { value }) => value,
  },

  [REMOVE_TODO]: {
    set: (store, { value, done, index }) => {
      store.dispatch(attemptAddTodo(value, index, done));
    },
    get: (store, payload) => {
      const state = store.getState();
      const { value, done } = getTodo(state, payload);
      return { value, done, index: payload };
    },
  },
};
