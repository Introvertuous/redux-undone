import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducers, transformers } from './modules';
import undone from '../../../dist';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export default () => {
  const rootReducer = combineReducers(reducers);
  const middleware = [thunk, undone.createMiddleware(transformers)];
  const composeEnhancers = composeWithDevTools({});

  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
};
