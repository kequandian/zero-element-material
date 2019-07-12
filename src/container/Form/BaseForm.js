import React, { useReducer, useRef } from 'react';
import useBaseForm from 'zero-element/lib/helper/form/useBaseForm';
import { useDidMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { getModel } from 'zero-element/lib/Model';

import NornalForm from '@/components/NormalForm';

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
  const { namespace, config, extraData, onClose, onSubmit } = props;
  const { API = {}, fields = [] } = config;
  const formProps = useBaseForm({
    namespace,
    modelPath: 'formData',
    extraData,
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
    const extraSubmit = {};
    fields.forEach(field => {
      if (field.type === 'hidden') {
        extraSubmit[field.field] = extraData[field.field] || field.value;
      }
    })
    const submitData = {
      ...extraSubmit,
      ...formRef.current.values,
    };
    
    if (onSubmit) {
      onSubmit(submitData);
      return false;
    }
    
    if (API.updateAPI) {
      onUpdateForm({
        fields: submitData,
      }).then(handleResponse);
    } else {
      onCreateForm({
        fields: submitData,
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
      <NornalForm
        initialValues={initData.current}
        onSubmit={handleSubmitForm}
        formRef={formRef}
        model={model}
        config={config}
        modelStatus={modelStatus}
        namespace={namespace}
      />
    </div>
    {renderFooter()}
  </>
}