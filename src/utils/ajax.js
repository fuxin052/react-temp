import axios from 'axios';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (value) {
  const data = value.data;
  Object.defineProperty(data, 'axios_info', { value });
  return data;
}, function (error) {
  let message = '服务器错误';
  try {
    message = error.response.data.message || message;
  } catch (e) { }
  console.warn(message);
  return Promise.reject(error);
});

// axios.defaults.baseURL = "";