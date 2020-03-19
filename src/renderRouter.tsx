import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import Layout from 'src/components/layout';
import { Switch, Route, Redirect, RouteChildrenProps } from 'react-router-dom';
import { permissionWhiteList } from 'src/route/index';
import Page404 from 'src/components/page404';
import { find } from 'lodash';
import Loading from 'src/components/loading';
import { Modal } from 'antd';

const GoToLoginTips = connect()((props: any) => {
  useEffect(() => {
    Modal.info({
      title: '提示!',
      content: '您的帐号没有权限查看任何一个页面，请联系管理员添加页面权限。',
    });
    window.localStorage.removeItem('RTLOGIN');
    props.dispatch({ type: 'login/updataState', payload: false });
    props.dispatch({ type: 'common/updataHasData', payload: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
});


const RenderRouter = (props: any) => {
  useEffect(function () {
    if (!props.common.hasData && !props.loading) {
      props.getInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.common.hasData]);
  const renderOtherRoute = ({ location: { pathname } }: RouteChildrenProps<{}>) => {
    const { common: { flattenMenu, permission } } = props;
    const f1 = (o: { path: string; component: any; permissionCode: any; }) =>
      o.path && o.component && ((permissionWhiteList.has(o.path) || permission.has(o.permissionCode)));
    const f2 = (o: { path: string; parent: string; permissionCode: any; }) =>
      o.path && pathname === o.parent && ((permissionWhiteList.has(o.path) || permission.has(o.permissionCode)));
    if (pathname === '/') {
      const result = find(flattenMenu, f1);
      return result ? <Redirect to={result.path} /> : <GoToLoginTips />;
    } else {
      const result = find(flattenMenu, f2);
      if (result) return <Redirect to={result.path} />;
      const hasPage = find(flattenMenu, f1);
      return hasPage ? <Page404 /> : <GoToLoginTips />;
    }
  };
  const { common: { hasData, flattenMenu, permission } } = props;
  if (hasData) {
    return <Layout>
      <Suspense fallback={<Loading />}>
        <Switch>
          {flattenMenu.map(
            (item: any) => item.component && ((permissionWhiteList.has(item.path) || permission.has(item.permissionCode))) ?
              <Route key={item.path} exact path={item.path} component={item.component} /> : null)}
          <Route render={renderOtherRoute} />
        </Switch>
      </Suspense>
    </Layout>;
  }
  return <Loading />;

};


export default connect(
  ({ common, loading }: any) => ({ common, loading: loading.models.common }),
  ({ common }: any) => common,
)(RenderRouter);