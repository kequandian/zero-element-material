"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Radio = _interopRequireDefault(require("@material-ui/core/Radio"));

var _RadioGroup = _interopRequireDefault(require("@material-ui/core/RadioGroup"));

var _FormControlLabel = _interopRequireDefault(require("@material-ui/core/FormControlLabel"));

var booleanMap = {
  'true': true,
  'false': false
};

var _default = function _default(props) {
  var value = props.value,
      _props$options = props.options,
      options = _props$options === void 0 ? [] : _props$options,
      onChange = props.onChange;

  function handleChange(e) {
    var v = e.target.value;

    if (onChange) {
      var fValue = booleanMap[v] || v;
      onChange(fValue === value ? undefined : fValue);
    }
  }

  return /*#__PURE__*/_react["default"].createElement(_RadioGroup["default"], {
    name: "position",
    value: String(value),
    onChange: handleChange,
    row: true
  }, options.map(function (opt) {
    return /*#__PURE__*/_react["default"].createElement(_FormControlLabel["default"], {
      key: opt.value,
      label: opt.label,
      value: String(opt.value),
      control: /*#__PURE__*/_react["default"].createElement(_Radio["default"], {
        color: "primary"
      }),
      labelPlacement: "end"
    });
  }));
};

exports["default"] = _default;