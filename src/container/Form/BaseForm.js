import React, { useReducer, useRef } from 'react';
import useBaseForm from 'zero-element/lib/helper/form/useBaseForm';
import { useDidMount, useWillMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { formatAPI } from 'zero-element/lib/utils/format';

import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { getModel } from 'zero-element/lib/Model';
import CircularProgress from '@material-ui/core/CircularProgress';

import NornalForm from '@/components/NormalForm';

const useStyles = makeStyles(theme => ({
  fields: {
    padding: theme.spacing(2),
  },
  button: {
    textAlign: 'right',
    padding: theme.spacing(1),
  },
  resetButton: {
    marginRight: 8,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
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

  useWillMount(_ => {
    fields.forEach(f => {
      if (f.options && f.options.API) {
        f.options.API = formatAPI(f.options.API, {
          namespace,
          data: extraData,
        });
      };
      if (f.value !== undefined) {
        initData.current[f.field] = f.value;
      }
    })
  });
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
      <Button className={classes.resetButton} onClick={handleReset}>
        重置
      </Button>
      <Button
        color="primary" variant="contained"
        disabled={loading}
        onClick={onSubmit}>
        保存
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </Button>
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