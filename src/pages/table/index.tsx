import React, { Component } from 'react';
import STable, { StableProps } from 'src/components/search-table';
import moment from 'moment';


class Index extends Component<any, StableProps> {
  state: StableProps = {
    selectAbled: true,
    operationList: [
      { text: '设置', click: (...arr: any) => { console.log(arr); } },
      {
        text: '更多', children: [
          { text: '设置', click: (...arr: any) => { console.log(arr); } },
          { text: '设置', click: (...arr: any) => { console.log(arr); } },
          { text: '设置数据', click: (...arr: any) => { console.log(arr); } },
        ],
      },
    ],
    searchConfig: [
      { label: '名称', name: 'a1', type: 'input', initialValue: '111' },
      { label: '名称2', name: 'a2', type: 'select', initialValue: '111' },
      { label: '名称3', name: 'a3', type: 'number', initialValue: 111 },
      { label: '名称4', name: 'a4', type: 'data', initialValue: moment('2019-04-04') },
      { label: '名称5', name: 'a5', type: 'range' },
    ],
    searchOption: {
      a2: [{ label: '111111', value: 1 },
      { label: '222222', value: 2 },
      { label: '333333', value: 3 }],
    },
    getData: (pageData, searchData) => fetch('http://rap2.taobao.org:38080/app/mock/149215/mock/list').then(res => res.json()),
    column: [
      {
        headerName: '编号',
        field: 'id',
        width: 50,
        pinned: 'left',
      },
      {
        headerName: '启用',
        field: 'disabled',
        valueGetter: (r) => r.data.disabled ? '启用' : '禁用',
        autoHeight: true,
        width: 90,
      },
      {
        headerName: '姓名',
        field: 'name',
        pinned: 'left',
        width: 80,
      },
      {
        headerName: '地址',
        field: 'address',
        flex: 2,
        minWidth: 300,
      },
      {
        headerName: '团长',
        field: 'owner',
        minWidth: 80,
        flex: 1,
        copyAdled: true,
      },
      {
        headerName: '状态',
        field: 'status',
        valueGetter: (r) => r.data.status ? '已完成' : '未完成',
      },
      {
        headerName: '修改日期',
        field: 'updatedAt',
        flex: 2,
        minWidth: 200,
      },
      {
        headerName: '创建日期',
        field: 'createdAt',
        flex: 2,
        minWidth: 200,
      },
    ],
    toolBar: [
      {
        text: '重新加载',
        type: '',
        onClick: (a) => { console.log(a); },
        loading: false,
        disabled: (rows) => rows.length === 0,
      },
    ],
    getTableApi: () => { },
    initFetch: false,
  }
  componentDidMount() {

  }

  render() {
    return (
      <STable {...this.state} />
    );
  }
}

export default Index;