import React from 'react';
import TableBase from './table-base';
import './index.less';
import ToolBar from './tool-bar';
import SearchForm from './search-form';
import BottomTool from './bottom-tool';
import { Spin } from 'antd';
import { GridReadyEvent, GridApi } from 'ag-grid-community';

interface TableApi {
  gridApi?: GridApi
  getListData: ([p]: any, [s]: any, b?: boolean) => void
  getSearchData: () => any
  getPageData: () => any
}

class STable extends React.Component<any, any>{
  constructor(props: any) {
    super(props);
    this.state = {
      selectChange: true,
      spinning: false,
      rowData: [],
      total: 0,
      searchData: {},
      pageData: {},
    };
    this.api = {
      getListData: this.getListData,
      getSearchData: () => this.state.searchData,
      getPageData: () => this.state.pageData,
    };
  }
  api: TableApi
  static defaultProps = {

  }
  getListData = async (p?: any, s?: any, firstPage?: boolean) => {
    const { pageData, searchData } = this.state;
    const { getData } = this.props;
    if (p) {
      this.setState({ pageData: p });
    } else {
      p = pageData;
    }
    if (s) {
      this.setState({ searchData: s });
    } else {
      s = searchData;
    }
    if (firstPage) {
      if (p!.page !== 1) {
        p.page = 1;
        this.setState({ pageData: { ...p } });
      }
    }
    this.setState({ spinning: true });
    try {
      console.log(p, s);
      const res = await getData(p, s);
      this.setState({
        rowData: res.data,
        total: 166,
      });
    } catch{ }
    this.setState({ spinning: false });
  }
  componentDidMount() {
    this.getListData();
  }

  render() {
    const {
      searchConfig, column, selectAbled, operationList,
      toolBar, getTableApi,
    } = this.props;
    const { total, pageData, spinning, selectChange, rowData } = this.state;

    const setGridApi = (params: GridReadyEvent) => {
      this.api.gridApi = params.api;
      getTableApi(this.api);
    };

    return <div className="search-table-component">
      <SearchForm getListData={this.getListData} searchConfig={searchConfig} />
      <Spin spinning={spinning}>
        {toolBar && toolBar.length ? <ToolBar api={this.api} selectChange={selectChange} toolBarList={toolBar} /> : null}
        <TableBase setSelectChange={() => { this.setState(({ selectChange }: any) => ({ selectChange: !selectChange })); }} setGridApi={setGridApi} rowData={rowData} api={this.api} column={column} selectAbled={selectAbled} operationList={operationList} />
        <BottomTool getListData={this.getListData} pageData={pageData} total={total} />
      </Spin>
    </div>;
  }
}
export default STable;