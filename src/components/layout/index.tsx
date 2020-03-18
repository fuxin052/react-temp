import { Layout, Menu } from 'antd';
import IconSvg from 'src/components/icon';
import React from 'react';
import { Menu as MenuType } from 'src/utils/formatMenuData';
import { Link, withRouter } from 'react-router-dom';
import './layout.less';
import { connect } from 'react-redux';

const { Header, Sider, Content } = Layout;

class SiderDemo extends React.Component<any> {
  state = {
    collapsed: false,
  };

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

  render() {
    const { menu, flattenMenu } = this.props;
    console.log(this.props);
    return (
      <Layout id="layout">
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.toggle}
        >
          <div className="logo" style={{ height: 32, background: 'rgba(255, 255, 255, 0.2)', margin: 16 }} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {this.renderMenu(menu)}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: '#fff', height: 40 }} > </Header>
          <Content>
            <div className="site-layout-background" style={{ padding: 20, minHeight: 360, overflowY: 'auto' }}>
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