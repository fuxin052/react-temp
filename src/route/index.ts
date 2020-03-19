import { lazy } from 'react';

export default [
  { path: '/table', component: lazy(() => import(/* webpackPrefetch: true *//*webpackChunkName: 'table'*/'src/pages/table')) },
  { path: '/list', component: lazy(() => import(/* webpackPrefetch: true *//*webpackChunkName: 'list'*/'src/pages/list')) },
  { path: '/charts', component: lazy(() => import(/* webpackPrefetch: true *//*webpackChunkName: 'charts'*/'src/pages/charts')) },
];

//以下页面没权限也能访问 pathlist
export const permissionWhiteList: Set<string> = new Set([]);
