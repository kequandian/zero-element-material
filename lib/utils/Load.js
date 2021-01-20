"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/interopRequireWildcard"));

var _react = _interopRequireDefault(require("react"));

var _component = _interopRequireDefault(require("@loadable/component"));

var _CircularProgress = _interopRequireDefault(require("@material-ui/core/CircularProgress"));

var _default = function _default(path) {
  return (0, _component["default"])(function () {
    return Promise.resolve("../".concat(path)).then(function (s) {
      return (0, _interopRequireWildcard2["default"])(require(s));
    });
  }, {
    fallback: /*#__PURE__*/_react["default"].createElement(_CircularProgress["default"], null)
  });
  ;
};

exports["default"] = _default;