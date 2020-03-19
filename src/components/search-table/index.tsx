import React, { Component } from 'react';
import TableBase from './table-base';
import  './index.less';
import ToolBar from './tool-bar';
import SearchForm from './search-form';
import BottomTool from './bottom-tool';

class STable extends Component {
  render() {
    return <div className="search-table-component">
      <SearchForm></SearchForm>
      <ToolBar></ToolBar>
      <TableBase></TableBase>
      <BottomTool></BottomTool>
    </div>;

  }
}

export default STable;