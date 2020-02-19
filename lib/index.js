"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _Load = _interopRequireDefault(require("./utils/Load"));

var _layout = require("zero-element-global/lib/layout");

var _container = require("zero-element-global/lib/container");

var _formItemType = require("zero-element-global/lib/formItemType");

// import { set as LASet } from 'zero-element-global/lib/listAction';
// import { set as AITSet } from 'zero-element-global/lib/actionItemType';
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