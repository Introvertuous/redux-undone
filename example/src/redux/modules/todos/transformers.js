import { ADD_TODO, REMOVE_TODO } from './types';
import { attemptRemoveTodo, attemptAddTodo } from './actions';
import { getTodo } from './selectors';

export default {
  [ADD_TODO]: {
    set: (dispatch, payload) => {
      dispatch(attemptRemoveTodo(payload));
    },
    get: (state, { value }) => value,
  },

  [REMOVE_TODO]: {
    set: (dispatch, todo) => {
      dispatch(attemptAddTodo(todo));
    },
    get: (state, payload) => {
      const { value, done } = getTodo(state, payload);
      return { value, done, index: payload };
    },
  },
};
