"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FormItemWrapped;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _formItemType = require("zero-element-global/lib/formItemType");

var _styles = require("@material-ui/core/styles");

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    field: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(2)
    },
    label: {
      marginRight: theme.spacing(2)
    },
    element: {
      flex: 1
    }
  };
});

function FormItemWrapped(_ref) {
  var label = _ref.label,
      type = _ref.type,
      input = _ref.input,
      meta = _ref.meta,
      options = _ref.options,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["label", "type", "input", "meta", "options"]);
  var visibleError = Boolean(meta.error && meta.touched);
  var classes = useStyles();

  if (type === 'empty') {
    return _react["default"].createElement(_react["default"].Fragment, null);
  }

  return _react["default"].createElement("div", {
    className: classes.field
  }, label ? _react["default"].createElement("label", {
    className: classes.label
  }, "".concat(label, ":")) : null, _react["default"].createElement(_formItemType.Render, (0, _extends2["default"])({
    n: type,
    className: classes.element,
    options: options
  }, input, rest)));
}