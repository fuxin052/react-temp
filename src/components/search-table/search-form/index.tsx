import React, { Component } from 'react';
import { Input, Form, Row, Col, InputNumber, Select, DatePicker, Button } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
class SearchForm extends Component {
  render() {
    return (
      <div className="st-search-root">
        <Form layout="horizontal" style={{ overflow: 'hidden' }}>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
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
              <Form.Item label="更新日期">
                <DatePicker locale={locale} style={{ width: '100%' }} placeholder="请输入更新日期" />
              </Form.Item>
            </Col>
            <Col md={8} sm={24} style={{textAlign:'right'}}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} >重置</Button>
              <span style={{ marginLeft: 8 }} onClick={() => { }}>收起</span>

            </Col>

          </Row>
        </Form>
      </div>
    );
  }
}

export default SearchForm;