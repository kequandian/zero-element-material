"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormItem = getFormItem;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _reactFinalForm = require("react-final-form");

var _FormItemWrapped = _interopRequireDefault(require("../container/Form/FormItemWrapped"));

var _checkExpected = _interopRequireDefault(require("./checkExpected"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function getFormItem(field, modelStatus, cfg) {
  var fieldName = field.field,
      label = field.label,
      value = field.value,
      _field$extra = field.extra,
      extra = _field$extra === void 0 ? '' : _field$extra,
      span = field.span,
      _field$rules = field.rules,
      rules = _field$rules === void 0 ? [] : _field$rules,
      type = field.type,
      _field$options = field.options,
      options = _field$options === void 0 ? {} : _field$options,
      expect = field.expect,
      rest = (0, _objectWithoutProperties2["default"])(field, ["field", "label", "value", "extra", "span", "rules", "type", "options", "expect"]);
  var formData = modelStatus[options.expectedPath || 'formData'];
  var namespace = cfg.namespace,
      _cfg$values = cfg.values,
      values = _cfg$values === void 0 ? {} : _cfg$values,
      onSaveOther = cfg.onSaveOther;

  if (!(0, _checkExpected["default"])(_objectSpread(_objectSpread({}, formData), values), expect)) {
    return null;
  }

  return /*#__PURE__*/_react["default"].createElement(_reactFinalForm.Field, (0, _extends2["default"])({
    key: fieldName,
    name: fieldName,
    span: span,
    parse: function parse(value) {
      return value;
    }
  }, rest, {
    validate: composeValidators.apply(void 0, (0, _toConsumableArray2["default"])(rules.map(handleRule)))
  }), function (_ref) {
    var input = _ref.input,
        meta = _ref.meta;
    return /*#__PURE__*/_react["default"].createElement(_FormItemWrapped["default"], (0, _extends2["default"])({
      label: label,
      type: type,
      options: options,
      input: input,
      meta: meta,
      defaultValue: Object.prototype.hasOwnProperty.call(values, fieldName) ? values[fieldName] : value,
      namespace: namespace,
      required: rules.indexOf('required') > -1,
      handle: {
        onSaveOther: onSaveOther
      }
    }, rest));
  });
}

function handleRule(rule) {
  if (typeof rule === 'string') {
    return defaultRule[rule] || defaultRule['undefined'];
  }
}

var composeValidators = function composeValidators() {
  for (var _len = arguments.length, validators = new Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }

  return function (value) {
    return validators.reduce(function (error, validator) {
      return error || validator(value);
    }, undefined);
  };
};

var defaultRule = {
  required: function required(value) {
    return value ? undefined : '必填';
  },
  undefined: function (_undefined) {
    function undefined(_x) {
      return _undefined.apply(this, arguments);
    }

    undefined.toString = function () {
      return _undefined.toString();
    };

    return undefined;
  }(function (value) {
    return console.warn("\u503C: ".concat(value, " \u4F7F\u7528\u4E86\u672A\u77E5\u7684\u6821\u9A8C\u89C4\u5219")) && undefined;
  })
};