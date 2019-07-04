"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTableFields = formatTableFields;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

/**
 *
 * 统一 Table columns 的格式
 * @export
 * @param {array} fields 标准化的 fields
 * @param {array} operation 对该行的操作
 * @returns material Table columns
 */
function formatTableFields() {
  var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var rst = fields.map(function (fieldCfg) {
    var field = fieldCfg.field,
        label = fieldCfg.label,
        rest = (0, _objectWithoutProperties2["default"])(fieldCfg, ["field", "label"]);
    return (0, _objectSpread2["default"])({
      field: field,
      title: label
    }, rest);
  });
  return rst;
}