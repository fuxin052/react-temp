import React from 'react';
import TableBase from './table-base';
import './index.less';
import ToolBar from './tool-bar';
import SearchForm from './search-form';
import BottomTool from './bottom-tool';

const STable = (props: any) => {
  const { searchConfig } = props;
  return <div className="search-table-component">
    <SearchForm searchConfig={searchConfig} />
    <ToolBar></ToolBar>
    <TableBase></TableBase>
    <BottomTool></BottomTool>
  </div>;
};


export default STable;