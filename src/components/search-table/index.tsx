import React, { useState, useEffect, useRef, useCallback } from 'react';
import TableBase from './table-base';
import './index.less';
import ToolBar from './tool-bar';
import SearchForm from './search-form';
import BottomTool from './bottom-tool';
import { Spin } from 'antd';
import { GridReadyEvent, GridApi } from 'ag-grid-community';

const STable = (props: any) => {


  const { searchConfig, column, selectAbled, operationList, getData, toolBar } = props;
  console.log(toolBar);
  const [rowData, setRowData] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [selectChange, setSelectChange] = useState(1);

  const [searchData, setSearchData] = useState({});
  const [pageData, setPageData] = useState({});

  const gridApi = useRef<GridApi>();
  const setGridApi = (params: GridReadyEvent) => { gridApi.current = params.api; };

  const getListData = useCallback(() => {
    setSpinning(true);
    getData(pageData, searchData)
      .then((res: any) => {
        setSpinning(false);
        setRowData(res.data);
      });
  }, [getData]);

  useEffect(() => {
    getListData();
  }, [getListData]);

  return <div className="search-table-component">
    <SearchForm searchConfig={searchConfig} />
    <Spin spinning={spinning}>
      {toolBar && toolBar.length > 0 ? <ToolBar api={gridApi.current} selectChange={selectChange}
        getData={getListData} toolBarList={toolBar}
      /> : null}
      <TableBase setSelectChange={() => setSelectChange(t => (t + 1))} setGridApi={setGridApi} rowData={rowData} column={column} selectAbled={selectAbled} operationList={operationList} />
      <BottomTool />
    </Spin>
  </div>;
};


export default STable;