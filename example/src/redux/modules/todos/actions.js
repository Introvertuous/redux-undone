import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from './types';
import { indexOf } from './selectors';

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

export const attemptRemoveTodo = value => (dispatch, getState) => {
  const state = getState();
  const index = indexOf(state, value);

  if (index === -1) {
    return Promise.resolve();
  }

  return dispatch(removeTodo(index));
};