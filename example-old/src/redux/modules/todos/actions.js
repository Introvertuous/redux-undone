import { ADD_TODO, REMOVE_TODO, UPDATE_TODO, SWAP_TODO } from './types';
import { indexOf, getTodo } from './selectors';

const addTodo = ({ value, index = -1, done = false }) => ({
  type: ADD_TODO,
  payload: { value, index, done },
});

const updateTodo = (index, done = true) => ({
  type: UPDATE_TODO,
  payload: { index, done },
});

const removeTodo = index => ({
  type: REMOVE_TODO,
  payload: index,
});

const swapTodo = (src, dst) => ({
  type: SWAP_TODO,
  payload: { src, dst },
});

export const attemptUpdateTodo = (value, done) => (dispatch, getState) => {
  const state = getState();
  const index = indexOf(state, value);

  if (index === -1) {
    return dispatch(addTodo({ value, done }));
  }

  return dispatch(updateTodo(index, done));
};

export const attemptAddTodo = todo => (dispatch, getState) => {
  const state = getState();

  if (indexOf(state, todo.value) !== -1) {
    return Promise.resolve();
  }

  return dispatch(addTodo(todo));
};

export const attemptSwapTodo = (src, dst) => (dispatch, getState) => {
  const state = getState();

  const srcTodo = getTodo(state, src);
  const dstTodo = getTodo(state, dst);
  if (srcTodo == null || dstTodo == null) {
    return Promise.resolve();
  }

  return dispatch(swapTodo(src, dst));
};

export const attemptRemoveTodo = value => (dispatch, getState) => {
  const state = getState();
  const index = indexOf(state, value);

  if (index === -1) {
    return Promise.resolve();
  }

  return dispatch(removeTodo(index));
};
