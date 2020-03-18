import axios from 'axios';
export default {
  state: false,
  reducers: {
    updataState: (state, payload) => payload,
  },
  effects: {
    async loginSubmit(params) {
      const res = await axios('http://rap2.taobao.org:38080/app/mock/149215/mock/login', { params });
      const result = res.status === 200;
      if (result) { window.localStorage.setItem('RTLOGIN', res.data); this.updataState(true); }
      return result;
    },
  },
};