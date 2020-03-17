import { Layout, Menu } from 'antd';
import IconSvg  from 'src/components/icon';
import React from 'react';

import { Link } from 'react-router-dom';
import './layout.less';

const { Header, Sider, Content } = Layout;

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout id="layout">
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.toggle}
        >
          <div className="logo" style={{ height: 32, background: 'rgba(255, 255, 255, 0.2)', margin: 16 }} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <IconSvg type="yxgl" />
              <Link to="/">nav 1</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <IconSvg type="yxgl" />
              <Link to="/news">nav 2</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: '#fff', height: 40 }} > </Header>
          <Content>
            <div className="site-layout-background" style={{ padding: 20, minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;