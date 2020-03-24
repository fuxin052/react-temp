// region
import React, { Fragment, memo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import { Divider, Typography, Dropdown, Menu } from 'antd';
import IconSVG from 'src/components/icon';
// endregion
// region 这里面有用法
// class TableBase extends Component<any, any> {
//   constructor(props: any) {
//     super(props);
//     const Btn = (prop: any) => <>
//       <span className="table-action-button" onClick={() => { console.log(this.props); }}>查看</span>
//       <Divider type="vertical" />
//       <span className="table-action-button" onClick={() => { }}>删除</span>
//       <Divider type="vertical" />
//       <span className="table-action-button" onClick={() => { }}>禁用</span>
//     </>;
//     this.state = {
//       columnDefs: [
//         {
//           checkboxSelection: true,
//           pinned: 'left',
//           suppressMovable: true,
//           headerCheckboxSelection:true,
//           width: 50,
//         },
//         {
//           headerName: '编号', // 表头文本
//           field: 'id', // 表头字段名
//           width: 50,
//           /* pinned?: boolean | string; 固定在左右侧可选值 true | 'left' | 'right' */
//           pinned: 'left',
//           tooltipField: 'id',
//         },
//         {
//           headerName: '启用',
//           field: 'disabled',
//           /* valueGetter?: ((params: ValueGetterParams) => any) | string; render函数 更改这个字段的值的函数*/
//           valueGetter: (r: any) => r.data.disabled ? '启用' : '禁用',
//           /* valueFormatter?: (params: ValueFormatterParams) => string | string; 更改这个字段的展示方式 值还是不变 */
//           autoHeight: true,
//           width: 90,
//           /* cellClass?: string | string[] | ((cellClassParams: CellClassParams) => string | string[]); 单元格classname*/
//           /* cellStyle?: {} | ((params: any) => {}); 单元格样式*/
//           cellStyle: (params: { data: { disabled: any; }; }) => ({ minHeight: params.data.disabled ? '50px' : '', backgroundColor: !params.data.disabled ? 'rgba(255,128,171,.4)' : 'rgba(185,246,202,.4)' }),
//         },
//         {
//           headerName: '姓名',
//           field: 'name',
//           /* tooltipField?: string; tooltip的字段设置*/
//           tooltipField: 'name',
//           /* tooltipValueGetter?: (params: ITooltipParams) => string; tooltip render函数*/
//           pinned: 'left',
//           width: 80,
//         },
//         {
//           headerName: '地址',
//           field: 'address',
//           tooltipField: 'address',
//           minWidth: 150,
//           flex: 2,
//         },
//         {
//           headerName: '团长',
//           field: 'owner',
//           minWidth: 80,
//           flex: 1,
//           cellRendererFramework: (prop: { value: any; }) => <Typography.Paragraph copyable>{prop.value}</Typography.Paragraph>,
//         },
//         {
//           headerName: '状态',
//           field: 'status',
//           valueGetter: (r: any) => r.data.status ? '已完成' : '未完成',
//           autoHeight: true,
//           cellStyle: (params: { data: { status: any; }; }) => ({ minHeight: params.data.status ? '80px' : '' }),
//           width: 80,
//         },
//         {
//           headerName: '修改日期',
//           field: 'updatedAt',
//           minWidth: 100,
//           flex: 2,
//         },
//         {
//           headerName: '创建日期',
//           field: 'createdAt',
//           minWidth: 100,
//           flex: 2,
//         },
//         {
//           headerName: '操作',
//           /* cellRendererFramework 接收一个组件 来代替这个单元格 */
//           cellRendererFramework: Btn,
//           pinned: 'right',
//           suppressMovable: true,
//         },
//       ],
//       rowData: undefined,
//     };
//   }

//   componentDidMount() {
//     fetch('http://rap2.taobao.org:38080/app/mock/149215/mock/list')
//       .then(res => res.json())
//       .then((res: any) => {
//         this.setState({ rowData: res.data });
//       });
//   }

//   render() {
//     const { columnDefs, rowData } = this.state;
//     return (
//       <div className="ag-theme-balham st-table-root" style={{ width: '100%', minHeight: 300 }}>
//         <AgGridReact
//           rowSelection="multiple"
//           columnDefs={columnDefs}
//           rowData={rowData}
//           suppressDragLeaveHidesColumns={true} // 取消拖动列到表格外删除列
//           // onGridReady={params => this.gridApi = params.api}
//           // rowMultiSelectWithClick // 点击行为多选
//           // suppressRowClickSelection // true取消点击行可以选中的
//           // enableRangeSelection
//           suppressCellSelection
//           enableCellTextSelection
//           rowDeselection
//         />
//       </div>
//     );
//   }
// }
// endregion

const handlerColumn = (props: any): any[] => {
  const { column, selectAbled, operationList } = props;
  const columnTemp = column.map((item: any) => {
    const obj: any = { flex: 2, minWidth: 80, ...item };
    if (obj.copyAdled) {
      delete obj.copyAdled;
      obj.cellRendererFramework = (prop: { value: any; }) => <Typography.Paragraph copyable>{prop.value}</Typography.Paragraph>;
    }
    return obj;
  });
  if (selectAbled) {
    columnTemp.unshift({
      checkboxSelection: true,
      pinned: 'left',
      suppressMovable: true,
      headerCheckboxSelection: true,
      width: 50,
    });
  }
  if (operationList && operationList.length) {
    let width = 13;
    operationList.forEach((item: { children: any[]; text: string; hidden: () => boolean; }) => {
      if (item.children && item.children.length) {
        width += ((item.text || '').length * 12 + 30);
        return;
      }
      if (!(item.hidden && item.hidden())) { width += ((item.text || '').length * 12 + 17); }
    });
    const Btn = (prop: any) => operationList.map((item: any, index: number) => (item.hidden && item.hidden()) ? null :
      <Fragment key={index}>
        <Divider type="vertical" />
        {
          (item.children && item.children.length > 0) ? <Dropdown overlay={
            <Menu>
              {item.children.map((childrenItem: any, childrenIndex: number) =>
                <Menu.Item key={childrenIndex}>
                  <span className="table-action-button" style={{ fontSize: 12 }} onClick={() => { childrenItem.click && childrenItem.click(prop, props.api); }}>{childrenItem.text}</span>
                </Menu.Item>,
              )}</Menu>
          }>
            <span className="table-action-button">{item.text}<IconSVG type="down" /></span>
          </Dropdown> :
            <span className="table-action-button" onClick={() => { item.click && item.click(prop, props); }}>{item.text}</span>
        }
      </Fragment>,
    );
    columnTemp.push(
      {
        headerName: '操作',
        /* cellRendererFramework 接收一个组件 来代替这个单元格 */
        cellRendererFramework: Btn,
        pinned: 'right',
        width,
        suppressMovable: true,
      },
    );

  }
  return columnTemp;
};
const TableBase = memo((props: any) => {
  const { rowData, setGridApi, setSelectChange } = props;
  return <div className="ag-theme-balham st-table-root" style={{ width: '100%', minHeight: 300 }}>
    <AgGridReact
      rowSelection="multiple"
      columnDefs={handlerColumn(props)}
      onSelectionChanged={setSelectChange}
      rowData={rowData}
      suppressDragLeaveHidesColumns={true} // 取消拖动列到表格外删除列
      onGridReady={setGridApi}
      suppressCellSelection
      enableCellTextSelection
      rowDeselection
    />
  </div>;
});

export default TableBase;



