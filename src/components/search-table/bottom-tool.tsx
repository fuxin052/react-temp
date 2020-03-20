import React, { Component } from 'react';
import { Pagination } from 'antd';

class BottomTool extends Component {
  render() {
    return (
      <div className="st-bottom-root">
        <Pagination
          total={85}
          showTotal={total => `共 ${total} 条数据`}
          pageSize={20}
          showSizeChanger
          defaultCurrent={1}
          pageSizeOptions={['10', '20', '50', '100']}
        />
      </div>
    );
  }
}

export default BottomTool;