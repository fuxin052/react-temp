import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './app';
import createLoadingPlugin from '@rematch/loading';
import { init } from '@rematch/core';
import models from './model';
import options from './model/loading';
import './utils/ajax.js';

const loading = createLoadingPlugin(options);
const initialState = {
  login: !!window.localStorage.getItem('RTLOGIN'),
};
const store = init({
  models,
  plugins: [loading],
  redux: { initialState },
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
