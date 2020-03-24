import React from 'react';
import { Pagination } from 'antd';

export default (props: any) => {
  const change = (page: any, pageSize: any) => {
    console.log(page, pageSize);
    const p = { page, pageSize };
    props.getListData(p);
  };
  return <div className="st-bottom-root">
    <Pagination
      total={props.total || 0}
      showTotal={total => `共 ${total} 条数据`}
      pageSize={props.pageData.pageSize || 10}
      showSizeChanger
      current={props.pageData.page || 1}
      pageSizeOptions={['10', '20', '50', '100']}
      onChange={change}
      onShowSizeChange={change}
    />
  </div>;
};