import React, { forwardRef, useImperativeHandle } from 'react';

const KitForm = forwardRef((props, ref) => {
  useImperativeHandle(
    ref,
    () => {
      return {
        validateFields() {
          return Promise.resolve();
        },
      };
    },
    []
  );
  return <>kit-info</>;
});

export default KitForm;
