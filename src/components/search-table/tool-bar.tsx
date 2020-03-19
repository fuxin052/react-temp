import React, { Component } from 'react';
import { Button } from 'antd';

class ToolBar extends Component {
  render() {
    return (
      <div className="st-tool-root">
          <Button>工具按钮</Button>
          <Button>工具按钮</Button>
          <Button>工具按钮</Button>
          <Button>工具按钮</Button>
          <Button>工具按钮</Button>
          <Button>工具按钮</Button>
          <Button>工具按钮</Button>
      </div>
    );
  }
}

export default ToolBar;