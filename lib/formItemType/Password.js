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
  var props = _ref.props,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["props"]);
  return /*#__PURE__*/_react["default"].createElement(_TextField["default"], (0, _extends2["default"])({}, rest, props, {
    type: "password"
  }));
};

exports["default"] = _default;