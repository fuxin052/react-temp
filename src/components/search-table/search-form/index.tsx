import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'antd';
import IconSVG from 'src/components/icon';
import { connect } from 'react-redux';
import renderSearchInput, { colProps, getCol, getButtonOffset } from './render-input';


const SearchForm = (props: any) => {
  let { searchConfig, clientWidth, searchData, searchOption } = props;
  const [collapsed, setCollapsed] = useState(false);
  const [form] = Form.useForm();
  const collapseRender = (collapsed: boolean, l: number, n: number) => {
    if (l < n) return null;
    const txt = collapsed ? '展开' : '收起';
    const transform = `rotate(${collapsed ? 0 : 0.5}turn)`;
    const style = { marginLeft: '0.2em', transition: '0.3s all', transform, display: 'inline-block' };
    return <span onClick={() => setCollapsed(!collapsed)} className="collapse-button table-action-button">{txt}<IconSVG type="down" style={style} /></span>;
  };
  const onFinish = (v: any) => {
    props.getListData(undefined, v, true);
  };
  const resetFields = () => form.resetFields();
  const cols = getCol(clientWidth);
  searchConfig = searchConfig || [];
  const [initialValues] = useState(searchData);
  return (
    <div className="st-search-root">
      <Form layout="horizontal" form={form} style={{ overflow: 'hidden' }} onFinish={onFinish} initialValues={initialValues}>
        <Row gutter={16} >
          {renderSearchInput(searchConfig, collapsed, cols, searchOption)}
          <Col {...colProps} style={{ textAlign: 'right' }} offset={getButtonOffset(searchConfig.length, cols, collapsed)}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button hidden={searchConfig.length === 0} style={{ marginLeft: 8 }} onClick={resetFields}>重置</Button>
            {collapseRender(collapsed, searchConfig.length, cols)}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default connect(({ common }: any) => (
  { clientWidth: common.clientWidth }
))(SearchForm);