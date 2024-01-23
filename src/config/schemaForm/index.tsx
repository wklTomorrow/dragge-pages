import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { createForm, onFormMount, onFormValuesChange } from '@formily/core';
import { createSchemaField } from '@formily/react';

import {
  Form,
  FormItem,
  DatePicker,
  Checkbox,
  Cascader,
  Editable,
  Input,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  FormGrid,
  FormLayout,
  FormTab,
  FormCollapse,
  ArrayTable,
  ArrayCards,
  FormButtonGroup,
} from '@formily/antd';
import { BRICK, fn } from '@/src/types';
import { Button } from 'antd';
import { KitSchemaType } from '@/src/types/kitSchema';
import url from '@/src/constant/url';

const SchemaField = createSchemaField({
  components: {
    Form,
    FormItem,
    DatePicker,
    Checkbox,
    Cascader,
    Editable,
    Input,
    NumberPicker,
    Switch,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    Space,
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    FormGrid,
    FormLayout,
    FormTab,
    FormCollapse,
    ArrayTable,
    ArrayCards,
    FormButtonGroup,
  },
});

const KitForm = forwardRef(
  (
    {
      handleChange,
      handleSync,
      initValue = {},
      schema = {
        form: {},
        schema: {},
      },
      kitType = '',
    }: {
      handleChange: fn;
      setInitForm: fn;
      handleSync: fn;
      initValue: Record<string, any>;
      schema: KitSchemaType;
      kitType: string;
    },
    ref
  ) => {
    const valueCacheRef = useRef<unknown>(null);
    const formMountedRef = useRef<boolean>(false);
    const form = createForm({
      initialValues: { ...initValue },
      effects: () => {
        onFormValuesChange((e) => {
          const value = e.getState().values;
          if (formMountedRef.current) {
            handleChange(value);
          } else {
            valueCacheRef.current = value;
          }
        });
        onFormMount(() => {
          formMountedRef.current = true;
          const value = valueCacheRef.current;
          if (value) {
            handleChange(value);
            valueCacheRef.current = null;
          }
        });
      },
    });
    useImperativeHandle(
      ref,
      () => {
        return {
          validateFields() {
            return form.validate();
          },
        };
      },
      [form]
    );
    return (
      <>
        <div>组件类型: {kitType}</div>
        <div>
          该组件使用了
          <a
            target="__black"
            href={[url.url.schema, [BRICK, kitType].join('-')].join('')}
          >
            schema平台
          </a>
        </div>
        <div>只会初始化的时候同步配置，点击按钮可以强制同步</div>
        <Button
          onClick={() => {
            handleSync(kitType);
          }}
        >
          同步
        </Button>
        <Form form={form} {...schema.form}>
          <SchemaField schema={schema.schema} />
        </Form>
      </>
    );
  }
);

export default KitForm;
