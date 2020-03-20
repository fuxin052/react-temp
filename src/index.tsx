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
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import { debounce } from 'lodash';

const loading = createLoadingPlugin(options);
const initialState = {
  login: !!window.localStorage.getItem('RTLOGIN'),
  common: { clientWidth: document.body.clientWidth },
};
const store = init({
  models,
  plugins: [loading],
  redux: { initialState },
});

const resizeCore = debounce((newClientWidth: number) => {
  store.dispatch({ type: 'common/updataClientWidth', payload: newClientWidth });
}, 100);

function resize() {
    resizeCore(document.body.clientWidth);
}

window.addEventListener('resize', resize);

ReactDOM.render(<Provider store={store}><ConfigProvider locale={zhCN}><App />
</ConfigProvider></Provider>, document.getElementById('root'));
