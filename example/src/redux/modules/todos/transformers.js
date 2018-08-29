import { ADD_TODO, REMOVE_TODO } from './types';
import { attemptRemoveTodo, attemptAddTodo } from './actions';
import { getTodo } from './selectors';

export default {
  [ADD_TODO]: {
    transform: (state, dispatch, data) => {
      dispatch(attemptRemoveTodo(data));
    },
    collect: (state, { value }) => value,
  },

  [REMOVE_TODO]: {
    transform: (state, dispatch, data) => {
      dispatch(attemptAddTodo(data));
    },
    collect: (state, payload) => {
      const { value, done } = getTodo(state, payload);
      return { value, done, index: payload };
    },
  },
};
