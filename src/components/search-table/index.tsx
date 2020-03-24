// region
import React from 'react';
import TableBase from './table-base';
import './index.less';
import ToolBar from './tool-bar';
import SearchForm from './search-form';
import BottomTool from './bottom-tool';
import { Spin } from 'antd';
import { GridReadyEvent, GridApi } from 'ag-grid-community';
// endregion

const getInitialValues = (searchConfig: any[]) => {
  const initialValues: any = {};
  for (let item of searchConfig) {
    if (item.name && item.initialValue) {
      initialValues[item.name] = item.initialValue;
    }
  }
  return initialValues;
};

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
      searchData: getInitialValues(props.searchConfig),
      pageData: {
        page: 1,
        pageSize: props.defaultPageSize,
      },
    };
    this.api = {
      getListData: this.getListData,
      getSearchData: () => this.state.searchData,
      getPageData: () => this.state.pageData,
    };
  }
  api: TableApi
  static defaultProps = {
    pageSizeOptions: ['10', '20', '50', '100'],
    defaultPageSize: 10,
    initFetch: true,
  }

  getListData = async (p?: any, s?: any, firstPage?: boolean) => {
    const { pageData, searchData } = this.state;
    const { getData } = this.props;
    let pchange = false, schange = false;
    if (p) { pchange = true; } else { p = pageData; }
    if (s) { schange = true; } else { s = searchData; }
    if (firstPage && p!.page !== 1) {
      p = { ...p, page: 1 };
      pchange = true;
    }
    this.setState({
      spinning: true,
      ...pchange && { pageData: p },
      ...schange && { searchData: s },
    });
    let xhrSuccess: any = false;
    try {
      const res = await getData(p, s);
      xhrSuccess = {
        rowData: res.data,
        total: 166,
      };
    } catch{ }
    this.setState({ spinning: false, ...xhrSuccess });
  }

  componentDidMount() {
    if (this.props.initFetch) {
      this.getListData();
    }
  }

  setGridApi = (params: GridReadyEvent) => {
    this.api.gridApi = params.api;
    this.props.getTableApi(this.api);
    try {
      document.querySelector('.ag-overlay-no-rows-center')!.innerHTML = '没有数据';
    } catch { }
  }

  setSelectChange = () => { this.setState(({ selectChange }: any) => ({ selectChange: !selectChange })); }

  render() {
    const { searchConfig, column, selectAbled, operationList, toolBar, pageSizeOptions,
      searchOption,
    } = this.props;
    const { total, pageData, spinning, selectChange, rowData, searchData,
    } = this.state;
    return <div className="search-table-component">
      <SearchForm getListData={this.getListData} searchConfig={searchConfig} searchData={searchData} searchOption={searchOption} />
      <Spin spinning={spinning}>
        {toolBar && toolBar.length ? <ToolBar api={this.api} selectChange={selectChange} toolBarList={toolBar} /> : null}
        <TableBase
          setSelectChange={this.setSelectChange}
          setGridApi={this.setGridApi}
          rowData={rowData}
          api={this.api}
          column={column}
          selectAbled={selectAbled}
          operationList={operationList}
        />
        <BottomTool
          getListData={this.getListData}
          pageData={pageData}
          total={total}
          pageSizeOptions={pageSizeOptions}
        />
      </Spin>
    </div>;
  }
}
export default STable;

