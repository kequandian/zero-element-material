"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _default = function _default(_ref) {
  var _ref$props = _ref.props,
      props = _ref$props === void 0 ? {} : _ref$props,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["props"]);
  var value = rest.value,
      defaultValue = rest.defaultValue,
      onChange = rest.onChange,
      className = rest.className;
  return _react["default"].createElement(_TextField["default"], (0, _extends2["default"])({
    className: className,
    value: value || defaultValue || '',
    onChange: onChange
  }, props));
};

exports["default"] = _default;