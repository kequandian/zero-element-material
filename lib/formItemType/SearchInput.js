"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CustomizedInputBase;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _InputBase = _interopRequireDefault(require("@material-ui/core/InputBase"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Search = _interopRequireDefault(require("@material-ui/icons/Search"));

var useStyles = (0, _styles.makeStyles)({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 320
  },
  input: {
    marginLeft: 8,
    flex: 1
  }
});

function CustomizedInputBase(_ref) {
  var name = _ref.name,
      options = _ref.options;
  var classes = useStyles();
  var onSubmit = options.onSubmit,
      _options$placeholder = options.placeholder,
      placeholder = _options$placeholder === void 0 ? '请输入' : _options$placeholder;

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit() {
    onSubmit((0, _defineProperty2["default"])({}, name, value));
  }

  return /*#__PURE__*/_react["default"].createElement(_Paper["default"], {
    className: classes.root
  }, /*#__PURE__*/_react["default"].createElement(_InputBase["default"], {
    className: classes.input,
    placeholder: placeholder,
    value: value,
    onChange: handleChange
  }), /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
    className: classes.iconButton,
    onClick: handleSubmit
  }, /*#__PURE__*/_react["default"].createElement(_Search["default"], null)));
}