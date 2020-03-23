import React, { Component } from 'react';
import STable from 'src/components/search-table';




class Index extends Component<any,any> {
  state = {
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
      { label: '名称', name: 'a1', type: 'input' },
      { label: '名称2', name: 'a2', type: 'select' },
      { label: '名称3', name: 'a3', type: 'number' },
      { label: '名称4', name: 'a4', type: 'data' },
      { label: '名称5', name: 'a5', type: 'range' },
    ],
    getData: (pageData: any, searchData: any) => fetch('http://rap2.taobao.org:38080/app/mock/149215/mock/list').then(res => res.json()),
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
        valueGetter: (r: any) => r.data.disabled ? '启用' : '禁用',
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
        valueGetter: (r: any) => r.data.status ? '已完成' : '未完成',
      },
      {
        headerName: '修改日期',
        field: 'updatedAt',
        flex: 2,
      },
      {
        headerName: '创建日期',
        field: 'createdAt',
        flex: 2,
      },
    ],
    toolBar: [
      {
        text: '重新加载',
        type: '',
        onClick: () => {
          this.setState(({toolBar}:any)=>{toolBar[0].loading = true;return {toolBar:[...toolBar]};});
        },
        loading: false,
        disabled: () => false,
      },
    ],
  }
  render() {
    return (
      <STable {...this.state} />
    );
  }
}

export default Index;