import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import IconSvg from 'src/components/icon';
import { Menu as MenuType } from 'src/utils/formatMenuData';
import { Link, withRouter } from 'react-router-dom';
import './layout.less';
import { connect } from 'react-redux';
import { find } from 'lodash';

const { Header, Sider, Content } = Layout;
class SiderDemo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: false,
      openKeys: getOpenKeys(props.flattenMenu, props.location.pathname),
      breadcrumbList: getBreadcrumbList(props.flattenMenu, props.location.pathname),
    };
  }

  static getDerivedStateFromProps(props: any, state: any) {
    const { pathname, flatMenuKeysLen } = state;
    if (props.location.pathname !== pathname || props.flattenMenu.length !== flatMenuKeysLen) {
      return {
        pathname: props.location.pathname,
        flatMenuKeysLen: props.flattenMenu.length,
        openKeys: getOpenKeys(props.flattenMenu, props.location.pathname),
        breadcrumbList: getBreadcrumbList(props.flattenMenu, props.location.pathname),
      };
    }
    return null;
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };



  renderMenu = (menulist: MenuType[]) => {
    function mapfunc(item: MenuType): any {
      return item.children && item.children.length > 0 ?
        <Menu.SubMenu
          key={item.path}
          title={
            <span>
              {item.icon && <IconSvg className="anticon" type={item.icon} />}
              <span>{item.name}</span>
            </span>
          }
        >
          {
            (item.children as MenuType[]).map(mapfunc)
          }
        </Menu.SubMenu> :
        <Menu.Item key={item.path}>
          {item.icon && <IconSvg className="anticon" type={item.icon} />}
          {
            /^https?:\/\//.test(item.path) ?
              <a href={item.path} target="_blank" rel="noopener noreferrer">{item.name}</a> :
              <Link to={item.path}>{item.name}</Link>

          }
        </Menu.Item>;
    }
    return menulist.map(mapfunc);
  }

  isMainMenu(openKey: string) {
    const { flattenMenu } = this.props;
    const k = find(flattenMenu, o => o.path = openKey);
    return k ? k.parent ? false : true : false;
  }

  handleOpenChange = (openKeys: string[]) => {
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
    });
  };

  itemRender(route: any, params: any, routes: any, paths: any) {

  }

  render() {
    const { menu } = this.props;
    const { openKeys, collapsed, breadcrumbList } = this.state;
    let selectedKeys = [this.props.location.pathname];
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    let props = {};
    if (openKeys && !collapsed) {
      props = {
        openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys,
      };
    }
    return (
      <Layout id="layout">
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.toggle}
        >
          <div className="logo" style={{ height: 32, background: 'rgba(255, 255, 255, 0.2)', margin: 16 }} />
          <Menu
            theme="dark"
            mode="inline"
            onOpenChange={this.handleOpenChange}
            selectedKeys={selectedKeys}
            {...props}
          >
            {this.renderMenu(menu)}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: '#fff', height: 40 }} >
            <Breadcrumb style={{lineHeight:'40px',float:'left',paddingLeft:15}}>
              {
                breadcrumbList.map((item: any) =>
                  <Breadcrumb.Item key={item.path}>{item.name || item.path}</Breadcrumb.Item>,
                )
              }
            </Breadcrumb>
          </Header>
          <Content>
            <div className="site-layout-background" style={{ padding: 15, minHeight: 360, overflowY: 'auto' }}>
              {this.props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(connect(
  ({ common: { menu, flattenMenu } }: any) => ({ menu, flattenMenu }),
)(SiderDemo));

function getOpenKeys(flattenMenu: any[], pathname: string) {
  const openKeys = [];
  let key = pathname;
  while (key) {
    const k = key;
    const p = find(flattenMenu, o => o.path === k);
    if (!p) { return []; }
    key = p.parent;
    key && openKeys.unshift(key);
  }
  return openKeys;
}

function getBreadcrumbList(flattenMenu: any, pathname: any) {
  const breadcrumbList = [];
  let key = pathname;
  while (key) {
    const k = key;
    const item = find(flattenMenu, o => o.path === k);
    if (!item) { return []; }
    breadcrumbList.unshift(item);
    key = item.parent;
  }
  return breadcrumbList;
}