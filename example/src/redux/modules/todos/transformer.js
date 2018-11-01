import { ADD_TODO, REMOVE_TODO } from './types';
import { attemptRemoveTodo, attemptAddTodo } from './actions';
import { getTodo } from './selectors';

export default {
  [ADD_TODO]: (prevState, nextState, action) => {
    const { value } = action.payload;
    return attemptRemoveTodo(value);
  },
  [REMOVE_TODO]: (prevState, nextState, action) => {
    const { payload } = action;
    const { value, done } = getTodo(prevState, payload);
    return attemptAddTodo({ value, done, index: payload });
  },
};
