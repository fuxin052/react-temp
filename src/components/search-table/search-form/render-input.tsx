import React from 'react';
import { Form, Col, Input, Select, InputNumber, DatePicker } from 'antd';
import { pick } from 'lodash';

export const colProps = { xxl: 6, /* ≥1600px */ xl: 8, /* ≥1200px */ lg: 8, /* ≥992px */  md: 8, /* ≥768px */ sm: 8 };
export const getCol = (clientWidth: number) => clientWidth >= 1600 ? 4 : 3;
export const getButtonOffset = (l: number, n: number, collapsed: boolean) => l >= n && collapsed ? 0 : 24 * (n - l % n - 1) / n;
const w100 = { width: '100%' };
const ph = (name: any, t?: any): string => `请${t ? '选择' : '输入'}${name}`;

export default (searchConfig: any, collapsed: boolean, cols: number) =>
  searchConfig.map((item: any, index: number) => {
    const colp = { ...colProps, key: item.name, hidden: collapsed && (cols - 2 < index) };
    const formitemp = pick(item, ['label', 'name', 'rules']);
    switch (item.type) {
      case 'input': return <Col {...colp}>
        <Form.Item {...formitemp} >
          <Input placeholder={!item.noplaceholder && (item.placeholder || ph(item.label))} />
        </Form.Item>
      </Col>;
      case 'select': return <Col {...colp}>
        <Form.Item {...formitemp}>
          <Select placeholder={!item.noplaceholder && (item.placeholder || ph(item.label, 1))}></Select>
        </Form.Item>
      </Col>;
      case 'number': return <Col {...colp}>
        <Form.Item {...formitemp}>
          <InputNumber style={w100} placeholder={!item.noplaceholder && (item.placeholder || ph(item.label))} />
        </Form.Item>
      </Col>;
      case 'data': return <Col {...colp}>
        <Form.Item {...formitemp}>
          <DatePicker style={w100} placeholder={!item.noplaceholder && (item.placeholder || ph(item.label, 1))} />
        </Form.Item>
      </Col>;
      case 'range': return <Col {...colp}>
        <Form.Item {...formitemp}>
          <DatePicker.RangePicker style={w100} placeholder={!item.noplaceholder ? item.placeholder || [ph(item.label, 1), ph(item.label, 1)] : ['', '']} />
        </Form.Item>
      </Col>;
      default: return null;
    }
  });
