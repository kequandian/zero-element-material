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
      className = rest.className,
      options = rest.options;
  var _options$rows = options.rows,
      rows = _options$rows === void 0 ? 4 : _options$rows;
  return /*#__PURE__*/_react["default"].createElement(_TextField["default"], (0, _extends2["default"])({
    className: className,
    value: value || defaultValue || '',
    onChange: onChange
  }, props, {
    multiline: true,
    rows: rows
  }));
};

exports["default"] = _default;