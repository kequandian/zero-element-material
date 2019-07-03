import React, { useReducer, useRef } from 'react';
import { Form } from 'react-final-form';
import useBaseForm from 'zero-element/lib/helper/form/useBaseForm';
import { useDidMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { getFormItem } from '@/utils/readConfig';
import { Render } from 'zero-element-global/lib/layout';
import { getModel } from 'zero-element/lib/Model';

const useStyles = makeStyles(theme => ({
  fields: {
    padding: theme.spacing(2),
  },
  button: {
    textAlign: 'right',
    padding: theme.spacing(1),
  }
}));

export default function BaseForm(props) {
  const classes = useStyles();
  const formRef = useRef({});
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const { namespace, config, onClose, onSubmit } = props;
  const { API = {}, layout = 'Empty', fields, layoutConfig = {} } = config;
  const { layoutType = 'vertical' } = layoutConfig;
  const formProps = useBaseForm({
    namespace,
    modelPath: 'formData',
  }, config);

  const model = getModel(namespace);

  const { loading, data, modelStatus, handle } = formProps;
  const initData = useRef(data);
  const { onGetOne, onCreateForm, onUpdateForm, onClearForm } = handle;

  useDidMount(_ => {
    if (API.getAPI) {
      onGetOne({}).then(({ code, data }) => {
        if (code === 200) {
          initData.current = data;
          forceUpdate();
        }
      });
    }
  });
  useWillUnmount(onClearForm);

  function handleSubmitForm() {
    if (onSubmit) {
      onSubmit(formRef.current.values);
      return false;
    }
    if (API.updateAPI) {
      onUpdateForm({
        fields: formRef.current.values,
      }).then(handleResponse);
    } else {
      onCreateForm({
        fields: formRef.current.values,
      }).then(handleResponse);
    }
  }
  function handleResponse(data = {}) {
    if (data.code === 200) {
      // message.success('操作成功');
      if (onClose) {
        onClose();
      }
    } else {
      // message.error(`操作失败: ${data.message}`);
    }
  }

  function handleReset() {
    formRef.current.form.reset();
    model.dispatch({
      type: 'save',
      payload: {
        formData: initData.current,
      }
    });
  }
  function renderFooter() {
    function onSubmit() {
      formRef.current.onSubmit();
    }
    return <div className={classes.button}>
      <Button onClick={handleReset}>重置</Button>
      <Button color="primary" onClick={onSubmit}>保存</Button>
    </div>
  }

  return <>
    <div className={classes.fields}>
      <Form
        initialValues={initData.current}
        onSubmit={handleSubmitForm}
        render={({ handleSubmit, form, submitting, pristine, values }) => {
          formRef.current = {
            form,
            values,
            onSubmit: handleSubmit,
          };
          model.setState('formData', values);
          return <form
            className={`ZEleM-Form-${layoutType}`}
            onSubmit={handleSubmit}
          >
            <Render n={layout} {...layoutConfig}>
              {fields.map(field => getFormItem(field, modelStatus, {
                namespace,
                values,
              }))}
            </Render>
          </form>
        }}
      />
    </div>
    {renderFooter()}
  </>
}