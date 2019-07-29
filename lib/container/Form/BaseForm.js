"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BaseForm;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _useBaseForm = _interopRequireDefault(require("zero-element/lib/helper/form/useBaseForm"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _format = require("zero-element/lib/utils/format");

var _styles = require("@material-ui/core/styles");

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Model = require("zero-element/lib/Model");

var _NormalForm = _interopRequireDefault(require("../../components/NormalForm"));

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    fields: {
      padding: theme.spacing(2)
    },
    button: {
      textAlign: 'right',
      padding: theme.spacing(1)
    },
    resetButton: {
      marginRight: 8
    }
  };
});

function BaseForm(props) {
  var classes = useStyles();
  var formRef = (0, _react.useRef)({});

  var _useReducer = (0, _react.useReducer)(function (x) {
    return x + 1;
  }, 0),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      forceUpdate = _useReducer2[1];

  var namespace = props.namespace,
      config = props.config,
      extraData = props.extraData,
      onClose = props.onClose,
      onSubmit = props.onSubmit;
  var _config$API = config.API,
      API = _config$API === void 0 ? {} : _config$API,
      _config$fields = config.fields,
      fields = _config$fields === void 0 ? [] : _config$fields;
  var formProps = (0, _useBaseForm["default"])({
    namespace: namespace,
    modelPath: 'formData',
    extraData: extraData
  }, config);
  var model = (0, _Model.getModel)(namespace);
  var loading = formProps.loading,
      data = formProps.data,
      modelStatus = formProps.modelStatus,
      handle = formProps.handle;
  var initData = (0, _react.useRef)(data);
  var onGetOne = handle.onGetOne,
      onCreateForm = handle.onCreateForm,
      onUpdateForm = handle.onUpdateForm,
      onClearForm = handle.onClearForm;
  (0, _lifeCycle.useWillMount)(function (_) {
    fields.forEach(function (f) {
      if (f.options && f.options.API) {
        f.options.API = (0, _format.formatAPI)(f.options.API, {
          namespace: namespace,
          data: extraData
        });
      }

      ;

      if (f.value !== undefined) {
        initData.current[f.field] = f.value;
      }
    });
  });
  (0, _lifeCycle.useDidMount)(function (_) {
    if (API.getAPI) {
      onGetOne({}).then(function (_ref) {
        var code = _ref.code,
            data = _ref.data;

        if (code === 200) {
          initData.current = data;
          forceUpdate();
        }
      });
    }
  });
  (0, _lifeCycle.useWillUnmount)(onClearForm);

  function handleSubmitForm() {
    var extraSubmit = {};
    fields.forEach(function (field) {
      if (field.type === 'hidden') {
        extraSubmit[field.field] = extraData[field.field] || field.value;
      }
    });
    var submitData = (0, _objectSpread2["default"])({}, extraSubmit, formRef.current.values);

    if (onSubmit) {
      onSubmit(submitData);
      return false;
    }

    if (API.updateAPI) {
      onUpdateForm({
        fields: submitData
      }).then(handleResponse);
    } else {
      onCreateForm({
        fields: submitData
      }).then(handleResponse);
    }
  }

  function handleResponse() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (data.code === 200) {
      // message.success('操作成功');
      if (onClose) {
        onClose();
      }
    } else {// message.error(`操作失败: ${data.message}`);
    }
  }

  function handleReset() {
    formRef.current.form.reset();
    model.dispatch({
      type: 'save',
      payload: {
        formData: initData.current
      }
    });
  }

  function renderFooter() {
    function onSubmit() {
      formRef.current.onSubmit();
    }

    return _react["default"].createElement("div", {
      className: classes.button
    }, _react["default"].createElement(_Button["default"], {
      className: classes.resetButton,
      onClick: handleReset
    }, "\u91CD\u7F6E"), _react["default"].createElement(_Button["default"], {
      color: "primary",
      variant: "contained",
      onClick: onSubmit
    }, "\u4FDD\u5B58"));
  }

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", {
    className: classes.fields
  }, _react["default"].createElement(_NormalForm["default"], {
    initialValues: initData.current,
    onSubmit: handleSubmitForm,
    formRef: formRef,
    model: model,
    config: config,
    modelStatus: modelStatus,
    namespace: namespace
  })), renderFooter());
}