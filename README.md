### Redux Undone

Undo & Redo for complex redux workflows.

### Installation

```
npm install --save redux-undone
```

### Usage

This library is implemented as a redux middleware. When setting up your redux
store, you create the middleware for redux-undone by passing in your
transformers.

```
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducers, transformers } from './modules';
import undone from 'redux-undone';

export default () => {
  const rootReducer = combineReducers(reducers);
  const middleware = [undone.createMiddleware(transformers)];

  return createStore(
    rootReducer,
    applyMiddleware(...middleware)
  );
};
```

Transformers is an object with a property for each undo-able action type. If you
do not include an action type, it is ignored by redux-undone (opt-in). Each
transformer must provide two methods, `collect` and `getTransform`.

`collect` is used to get and store the data needed for the transformation, when
the action in question is dispatched. It is passed the state before and after
the dispatch occurs and the action payload.

`getTransform` returns either a thunk or an action representing the
transformation from the original action. It is passed the current state and the
data from `collect`.

```
...
{
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
}
...
```

Now all you need to do is make use of the provided action creators.

```
import { undo, redo } from 'redux-undone';
...
store.dispatch(undo());
...
store.dispatch(redo());
...
```

See example for complete usage.

### Additional Notes

If you are using `redux-thunk`, you can continue to do so, but it is unnecessary, because this library also handles thunks.
