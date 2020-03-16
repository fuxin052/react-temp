import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';

import createLoadingPlugin from '@rematch/loading'
import { init } from '@rematch/core'
import models from './model'
import options from './model/loading';
const loading = createLoadingPlugin(options)
const store = init(
  {
  models,
  plugins: [loading],
 }
 );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
