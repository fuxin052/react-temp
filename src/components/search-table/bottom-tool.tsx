import React, { memo } from 'react';
import { Pagination } from 'antd';

export default memo((props: any) => {
  const change = (page: any, pageSize: any) => {
    const p = { page, pageSize };
    props.getListData(p);
  };
  const { pageData: { pageSize, page }, pageSizeOptions, total } = props;
  return <div className="st-bottom-root">
    <Pagination
      total={total || 0}
      showTotal={total => `共 ${total} 条数据`}
      pageSize={pageSize || 10}
      showSizeChanger
      current={page || 1}
      pageSizeOptions={pageSizeOptions}
      onChange={change}
      onShowSizeChange={change}
    />
  </div>;
});