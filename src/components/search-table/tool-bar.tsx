import React, { memo } from 'react';
import { Button } from 'antd';

export default memo((props: any) => {
  const { toolBarList } = props;
  return <div className="st-tool-root">
    {
      toolBarList.map((v: any, i: number) =>
        <Button
          key={i}
          {...v}
          onClick={e => v.onClick && v.onClick(e, props.api)}
          disabled={v.disabled && v.disabled()}
        >
          {v.text}
        </Button>)
    }
  </div>;
});
