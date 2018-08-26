import { createSelector } from 'reselect';

export const getTodos = state => state.todos.todos;

export const indexOf = (state, value) =>
  createSelector(getTodos, todos =>
    todos.map(({ value }) => value).indexOf(value)
  )(state);

export const getTodo = (state, index) =>
  createSelector(getTodos, todos => todos[index])(state);
