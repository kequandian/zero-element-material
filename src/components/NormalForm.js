import React from 'react';
import { Form } from 'react-final-form';
import { getFormItem } from '@/utils/readConfig';
import { Render } from 'zero-element/lib/config/layout';
import { setPageData } from 'zero-element/lib/Model'

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
      }
      if (formRef) {
        formRef.current = {
          form,
          values,
          onSubmit: handleSubmit,
        };
        setPageData('formData', values);
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