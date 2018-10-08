import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducers, transformers } from './modules';
import undone from '../../../dist';
import { composeWithDevTools } from 'redux-devtools-extension';

export default () => {
  const rootReducer = combineReducers(reducers);
  const middleware = [undone.createMiddleware(transformers)];
  const composeEnhancers = composeWithDevTools({});

  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
};
