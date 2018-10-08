import { ADD_TODO, REMOVE_TODO } from './types';
import { attemptRemoveTodo, attemptAddTodo } from './actions';
import { getTodo } from './selectors';

export default {
  [ADD_TODO]: {
    getTransform: (state, data) => attemptRemoveTodo(data),
    collect: (oldState, newState, { value }) => value,
  },

  [REMOVE_TODO]: {
    getTransform: (state, data) => attemptAddTodo(data),
    collect: (oldState, newState, payload) => {
      const { value, done } = getTodo(oldState, payload);
      return { value, done, index: payload };
    },
  },
};
