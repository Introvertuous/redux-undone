import todos from './todos';

export const reducers = { todos: todos.reducer };

export const transformers = { ...todos.transformers };