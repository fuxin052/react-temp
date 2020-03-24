import React, { useState } from 'react';
import { Button } from 'antd';

export default (props: any) => {
  const { toolBarList } = props;
  const [loading, setLoading] = useState(0);
  const selectRow = props.api.gridApi ? props.api.gridApi.getSelectedRows() : [];
  return <div className="st-tool-root">
    {
      toolBarList.map((item: any, index: number) =>
        <Button
          {...item}
          key={index}
          onClick={
            async e => {
              setLoading(l => l + 1);
              try {
                item.onClick && await item.onClick(e, selectRow, props.api);
              } catch{ }
              setLoading(l => l - 1);
            }
          }
          loading={!!loading}
          disabled={item.disabled && item.disabled(selectRow, props.api)}
        >
          {item.text}
        </Button>)
    }
  </div>;
};
