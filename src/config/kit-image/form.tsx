import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { fn } from '@/src/types';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const KitForm = forwardRef(
  (
    {
      handleChange,
      initValue = {},
    }: { handleChange: fn; setInitForm: fn; initValue: Record<string, any> },
    ref
  ) => {
    const [form] = useForm();
    const onValuesChange = () => {
      handleChange(form.getFieldsValue());
      form.validateFields;
    };
    useImperativeHandle(
      ref,
      () => {
        return {
          validateFields() {
            return form.validateFields();
          },
        };
      },
      []
    );
    return (
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ ...initValue }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    );
  }
);
export default KitForm;
