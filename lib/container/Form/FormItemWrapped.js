"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FormItemWrapped;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _formItemType = require("zero-element/lib/config/formItemType");

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

var Required = function Required() {
  return /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      color: 'red'
    }
  }, "*");
};

function FormItemWrapped(_ref) {
  var label = _ref.label,
      type = _ref.type,
      input = _ref.input,
      meta = _ref.meta,
      options = _ref.options,
      required = _ref.required,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["label", "type", "input", "meta", "options", "required"]);
  var visibleError = Boolean(meta.error && meta.touched);
  var classes = useStyles();

  if (type === 'empty') {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.field
  }, label ? /*#__PURE__*/_react["default"].createElement("label", {
    className: classes.label
  }, required ? /*#__PURE__*/_react["default"].createElement(Required, null) : null, "".concat(label, ":")) : null, /*#__PURE__*/_react["default"].createElement(_formItemType.Render, (0, _extends2["default"])({
    n: type,
    className: classes.element,
    options: options
  }, input, rest, {
    error: visibleError
  })));
}