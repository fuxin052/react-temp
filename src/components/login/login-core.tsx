import React from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux';

const LoginCore = (props: any) => {

  return (
    <Form
      name="basic"
      initialValues={{ username: '12345', password: '12345' }}
      onFinish={props.loginSubmit}
      style={{ maxWidth: 300, margin: 'auto', padding:'50px 0' }}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={props.loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect(
  ({ common, loading }: any) => ({ common,loading:loading.models.login }),
  ({ login }: any) => login,
)(LoginCore);