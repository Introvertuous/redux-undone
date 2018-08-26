import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from './types';
import produce from 'immer';

const initialState = {
  todos: [],
};

export default (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case ADD_TODO: {
        draft.todos.push(payload);
        break;
      }

      case REMOVE_TODO: {
        draft.todos.splice(payload, 1);
        break;
      }

      case UPDATE_TODO: {
        const { index, done } = payload;
        draft.todos[index].done = done;
        break;
      }

      default:
        return state;
    }
  });
