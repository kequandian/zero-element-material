"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BaseForm;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactFinalForm = require("react-final-form");

var _useBaseForm = _interopRequireDefault(require("zero-element/lib/helper/form/useBaseForm"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _styles = require("@material-ui/core/styles");

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _readConfig = require("../../utils/readConfig");

var _layout = require("zero-element-global/lib/layout");

var _Model = require("zero-element/lib/Model");

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    fields: {
      padding: theme.spacing(2)
    },
    button: {
      textAlign: 'right',
      padding: theme.spacing(1)
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
      onClose = props.onClose,
      onSubmit = props.onSubmit;
  var _config$API = config.API,
      API = _config$API === void 0 ? {} : _config$API,
      _config$layout = config.layout,
      layout = _config$layout === void 0 ? 'Empty' : _config$layout,
      fields = config.fields,
      _config$layoutConfig = config.layoutConfig,
      layoutConfig = _config$layoutConfig === void 0 ? {} : _config$layoutConfig;
  var _layoutConfig$layoutT = layoutConfig.layoutType,
      layoutType = _layoutConfig$layoutT === void 0 ? 'vertical' : _layoutConfig$layoutT;
  var formProps = (0, _useBaseForm["default"])({
    namespace: namespace,
    modelPath: 'formData'
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
    if (onSubmit) {
      onSubmit(formRef.current.values);
      return false;
    }

    if (API.updateAPI) {
      onUpdateForm({
        fields: formRef.current.values
      }).then(handleResponse);
    } else {
      onCreateForm({
        fields: formRef.current.values
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
      onClick: handleReset
    }, "\u91CD\u7F6E"), _react["default"].createElement(_Button["default"], {
      color: "primary",
      onClick: onSubmit
    }, "\u4FDD\u5B58"));
  }

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", {
    className: classes.fields
  }, _react["default"].createElement(_reactFinalForm.Form, {
    initialValues: initData.current,
    onSubmit: handleSubmitForm,
    render: function render(_ref2) {
      var handleSubmit = _ref2.handleSubmit,
          form = _ref2.form,
          submitting = _ref2.submitting,
          pristine = _ref2.pristine,
          values = _ref2.values;
      formRef.current = {
        form: form,
        values: values,
        onSubmit: handleSubmit
      };
      model.setState('formData', values);
      return _react["default"].createElement("form", {
        className: "ZEleM-Form-".concat(layoutType),
        onSubmit: handleSubmit
      }, _react["default"].createElement(_layout.Render, (0, _extends2["default"])({
        n: layout
      }, layoutConfig), fields.map(function (field) {
        return (0, _readConfig.getFormItem)(field, modelStatus, {
          namespace: namespace,
          values: values
        });
      })));
    }
  })), renderFooter());
}