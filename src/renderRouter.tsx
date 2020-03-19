import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import Layout from 'src/components/layout';
import { Spin } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import { permissionWhiteList } from 'src/route/index';
import Page404 from 'src/components/page404';
import { find } from 'lodash';

const Loading = () => <div className="home-loading">
  <Spin />
</div>;

class RenderRouter extends Component<any> {
  constructor(props: any) {
    super(props);
    if (!props.common.hasData && !props.loading) {
      props.getInfo();
    }
  }

  renderOtherRoute = () => {
    const { common: { flattenMenu, permission } } = this.props;
    const result = find(flattenMenu, o => o.path && o.component && ((permissionWhiteList.has(o.path) || permission.has(o.permissionCode))));
    console.log(result);
    return result ? <Redirect to={result.path} /> : <Page404 />;
  }

  render() {
    const { common: { hasData, flattenMenu, permission } } = this.props;
    if (hasData) {
      return <Layout>
        <Suspense fallback={<Loading />}>
          <Switch>
            {flattenMenu.map(
              (item: any) => item.component && ((permissionWhiteList.has(item.path) || permission.has(item.permissionCode))) ?
                <Route key={item.path} exact path={item.path} component={item.component} /> : null)}
            <Route render={this.renderOtherRoute} />
          </Switch>
        </Suspense>
      </Layout>;

    }
    return <Loading />;

  }
}

export default connect(
  ({ common, loading }: any) => ({ common, loading: loading.models.common }),
  ({ common }: any) => common,
)
  (RenderRouter);