import axios from 'axios';
import flatten from 'src/utils/flatten';
import merge from 'src/utils/mergeArray';
import formatMenu from 'src/utils/formatMenuData';
import route from 'src/route';

export default {
  state: {
    menu: [],
    permission: [],
    flattenMenu: [],
    hasData: false,
    clientWidth: 0,
  },
  reducers: {
    updataState: (state, payload) => Object.assign({}, state, payload),
  },

  effects: {
    async getInfo() {
      const [menuRes, permissionRes] = await Promise.all([
        axios.get('http://rap2.taobao.org:38080/app/mock/149215/mock/menu'),
        axios.get('http://rap2.taobao.org:38080/app/mock/149215/mock/permission'),
      ]);
      const permission = new Set(permissionRes.data || []);
      this.updataState({
        menu: formatMenu(menuRes.data, permission, true),
        permission,
        flattenMenu: merge(flatten(menuRes.data), route),
        hasData: true,
      });
    },
    updataClientWidth(clientWidth, state) { (clientWidth !== state.common.clientWidth) && this.updataState({ clientWidth }); },
    updataHasData(hasData) { this.updataState({ hasData }); },
  },
};
