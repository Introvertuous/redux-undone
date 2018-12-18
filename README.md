[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![NPM: redux-undone](https://badge.fury.io/js/redux-undone.svg)](https://www.npmjs.com/package/redux-undone)
[![Build Status](https://travis-ci.org/Introvertuous/redux-undone.svg?branch=master)](https://travis-ci.org/Introvertuous/redux-undone)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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
do not include a transformer for an action type, it is ignored by redux-undone
(opt-in). A transformer is a function that is passed three parameters: the
state before before the original action was dispatched, the state after the
original action was dispatched, and the original action itself. The function
must return either a thunk or an action, which represents the transformation
from the original action.

```
...
{
  [ADD_TODO]: (action, prevState, nextState, undoing) => {
    const { value } = action.payload;
    return attemptRemoveTodo(value);
  },
  [REMOVE_TODO]: (action, prevState, nextState, undoing) => {
    const { payload } = action;
    const { value, done } = getTodo(prevState, payload);
    return attemptAddTodo({ value, done, index: payload });
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
