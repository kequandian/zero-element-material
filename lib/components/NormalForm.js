"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = NormalForm;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _reactFinalForm = require("react-final-form");

var _readConfig = require("../utils/readConfig");

var _layout = require("zero-element/lib/config/layout");

var _Model = require("zero-element/lib/Model");

function NormalForm(props) {
  var initialValues = props.initialValues,
      onSubmit = props.onSubmit,
      formRef = props.formRef,
      model = props.model,
      _props$config = props.config,
      config = _props$config === void 0 ? {} : _props$config,
      _props$modelStatus = props.modelStatus,
      modelStatus = _props$modelStatus === void 0 ? {} : _props$modelStatus,
      namespace = props.namespace;
  var _config$layout = config.layout,
      layout = _config$layout === void 0 ? 'Empty' : _config$layout,
      fields = config.fields,
      _config$layoutConfig = config.layoutConfig,
      layoutConfig = _config$layoutConfig === void 0 ? {} : _config$layoutConfig;
  return /*#__PURE__*/_react["default"].createElement(_reactFinalForm.Form, {
    initialValues: initialValues,
    onSubmit: onSubmit,
    render: function render(_ref) {
      var handleSubmit = _ref.handleSubmit,
          form = _ref.form,
          submitting = _ref.submitting,
          pristine = _ref.pristine,
          values = _ref.values;

      function saveOther(key, value) {
        values[key] = value;
      }

      if (formRef) {
        formRef.current = {
          form: form,
          values: values,
          onSubmit: handleSubmit
        };
        (0, _Model.setPageData)('formData', values);
      }

      return /*#__PURE__*/_react["default"].createElement("form", {
        onSubmit: handleSubmit
      }, /*#__PURE__*/_react["default"].createElement(_layout.Render, (0, _extends2["default"])({
        n: layout
      }, layoutConfig), fields.map(function (field) {
        return (0, _readConfig.getFormItem)(field, modelStatus, {
          namespace: namespace,
          values: values,
          onSaveOther: saveOther
        });
      })));
    }
  });
}