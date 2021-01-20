"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _Load = _interopRequireDefault(require("./utils/Load"));

var _layout = require("zero-element/lib/config/layout");

var _container = require("zero-element/lib/config/container");

var _formItemType = require("zero-element/lib/config/formItemType");

var _APIConfig = require("zero-element/lib/config/APIConfig");

// import { set as LASet } from 'zero-element/lib/config/listAction';
// import { set as AITSet } from 'zero-element/lib/config/actionItemType';
(0, _APIConfig.set)({
  'DEFAULT_current': 1,
  'DEFAULT_pageSize': 10,
  'REQUEST_FIELD_current': 'pageNum',
  'REQUEST_FIELD_pageSize': 'pageSize',
  'REQUEST_FIELD_field': 'field',
  'REQUEST_FIELD_order': 'order',
  'RESPONSE_FIELD_current': 'current',
  'RESPONSE_FIELD_pageSize': 'size',
  'RESPONSE_FIELD_total': 'total',
  'RESPONSE_FIELD_records': 'records',
  'RESPONSE_FIELD_PID': 'pid'
});
(0, _layout.set)({
  'Empty': function Empty(_ref) {
    var children = _ref.children;
    return children;
  }
});
(0, _container.set)({
  BaseForm: (0, _Load["default"])('container/Form/BaseForm')
}); // LASet({
// });

(0, _formItemType.set)({
  hidden: (0, _Load["default"])('formItemType/Hidden'),
  plain: (0, _Load["default"])('formItemType/Plain'),
  input: (0, _Load["default"])('formItemType/Input'),
  number: (0, _Load["default"])('formItemType/Number'),
  radio: (0, _Load["default"])('formItemType/Radio'),
  password: (0, _Load["default"])('formItemType/Password'),
  tags: (0, _Load["default"])('formItemType/Tags'),
  'text-area': (0, _Load["default"])('formItemType/TextArea'),
  'search-input': (0, _Load["default"])('formItemType/SearchInput'),
  'search-select': (0, _Load["default"])('formItemType/SearchSelect'),
  'search-tree': (0, _Load["default"])('formItemType/SearchTree'),
  'upload-image': (0, _Load["default"])('formItemType/UploadImage')
}); // AITSet({
// });