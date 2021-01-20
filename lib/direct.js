"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _layout = require("zero-element/lib/config/layout");

var _container = require("zero-element/lib/config/container");

var _formItemType = require("zero-element/lib/config/formItemType");

var _BaseForm = _interopRequireDefault(require("./container/Form/BaseForm"));

var _Hidden = _interopRequireDefault(require("./formItemType/Hidden"));

var _Plain = _interopRequireDefault(require("./formItemType/Plain"));

var _Input = _interopRequireDefault(require("./formItemType/Input"));

var _Number = _interopRequireDefault(require("./formItemType/Number"));

var _Radio = _interopRequireDefault(require("./formItemType/Radio"));

var _Password = _interopRequireDefault(require("./formItemType/Password"));

var _Tags = _interopRequireDefault(require("./formItemType/Tags"));

var _Textarea = _interopRequireDefault(require("./formItemType/Textarea"));

var _SearchInput = _interopRequireDefault(require("./formItemType/SearchInput"));

var _SearchSelect = _interopRequireDefault(require("./formItemType/SearchSelect"));

var _SearchTree = _interopRequireDefault(require("./formItemType/SearchTree"));

var _UploadImage = _interopRequireDefault(require("./formItemType/UploadImage"));

(0, _layout.set)({
  'Empty': function Empty(_ref) {
    var children = _ref.children;
    return children;
  }
});
(0, _container.set)({
  BaseForm: _BaseForm["default"]
});
(0, _formItemType.set)({
  'hidden': _Hidden["default"],
  'plain': _Plain["default"],
  'input': _Input["default"],
  'number': _Number["default"],
  'radio': _Radio["default"],
  'password': _Password["default"],
  'tags': _Tags["default"],
  'text-area': _Textarea["default"],
  'search-input': _SearchInput["default"],
  'search-select': _SearchSelect["default"],
  'search-tree': _SearchTree["default"],
  'upload-image': _UploadImage["default"]
});