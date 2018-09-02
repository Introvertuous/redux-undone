import { ADD_TODO, REMOVE_TODO, UPDATE_TODO, SWAP_TODO } from './types';
import produce from 'immer';

const initialState = {
  todos: [],
};

export default (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case ADD_TODO: {
        const { done, value, index } = payload;
        const todo = { done, value };
        if (index === -1) {
          draft.todos.push(todo);
        } else {
          draft.todos.splice(index, 0, todo);
        }
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

      case SWAP_TODO: {
        const { src, dst } = payload;
        draft.todos.splice(dst, 0, draft.todos.splice(src, 1)[0]);
        break;
      }

      default:
        return state;
    }
  });
