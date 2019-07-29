import React from 'react';
import { Form } from 'react-final-form';
import { getFormItem } from '@/utils/readConfig';
import { Render } from 'zero-element-global/lib/layout';

export default function NormalForm(props) {
  const {
    initialValues,
    onSubmit,
    formRef, model,
    config = {},
    modelStatus = {}, namespace,
  } = props;
  const { layout = 'Empty', fields, layoutConfig = {} } = config;

  return <Form
    initialValues={initialValues}
    onSubmit={onSubmit}
    render={({ handleSubmit, form, submitting, pristine, values }) => {
      function saveOther(key, value) {
        values[key] = value;
        model.update();
      }
      if (formRef) {
        formRef.current = {
          form,
          values,
          onSubmit: handleSubmit,
        };
        model.setState('formData', values);
      }
      return <form
        onSubmit={handleSubmit}
      >
        <Render n={layout} {...layoutConfig}>
          {fields.map(field => getFormItem(field, modelStatus, {
            namespace,
            values,
            onSaveOther: saveOther,
          }))}
        </Render>
      </form>
    }}
  />
}