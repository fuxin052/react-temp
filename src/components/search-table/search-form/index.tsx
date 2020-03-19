import React, { useState } from 'react';
import { Input, Form, Row, Col, InputNumber, Select, DatePicker, Button } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import IconSVG from 'src/components/icon';


const colProps = {
  xxl: 6,  // xxl  ≥1600px
  xl: 8,   // xl   ≥1200px
  lg: 8,   // lg	  ≥992px
  md: 12,  // md	  ≥768px
  sm: 12,  // sm	  ≥576px
};

const SearchForm = (props: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const collapseRender = (collapsed: boolean) => {
    const txt = collapsed ? '展开' : '收起';
    const transform = `rotate(${collapsed ? 0 : 0.5}turn)`;
    const style = { marginLeft: '0.2em', transition: '0.3s all', transform, display: 'inline-block' };
    return <span onClick={() => setCollapsed(!collapsed)} className="collapse-button table-action-button">{txt}<IconSVG type="down" style={style} /></span>;
  };
  return (
    <div className="st-search-root">
      <Form layout="horizontal" style={{ overflow: 'hidden' }}>
        <Row gutter={16} justify="end">
          <Col md={8} sm={24}>
            <Form.Item label="规则名称" name="a1">
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="使用状态">
              <Select placeholder="请选择" style={{ width: '100%' }}>
                <Select.Option value="0">关闭</Select.Option>
                <Select.Option value="1">运行中</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="调用次数">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="更新日期更新日期更新日期更新日期更新日期更新日期">
              <DatePicker locale={locale} style={{ width: '100%' }} placeholder="请输入更新日期" />
            </Form.Item>
          </Col>
          <Col {...colProps} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} >重置</Button>
            {collapseRender(collapsed)}
          </Col>
        </Row>
      </Form>
    </div>
  );
};


export default SearchForm;