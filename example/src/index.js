import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'containers/root';
import { Provider } from 'react-redux';
import configureStore from './redux';
import './styling/normalize.css';
import './styling/base.css';

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);
