"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _layout = require("zero-element-global/lib/layout");

var _container = require("zero-element-global/lib/container");

var _formItemType = require("zero-element-global/lib/formItemType");

var _BaseForm = _interopRequireDefault(require("./container/Form/BaseForm"));

var _Plain = _interopRequireDefault(require("./formItemType/Plain"));

var _Input = _interopRequireDefault(require("./formItemType/Input"));

var _SearchInput = _interopRequireDefault(require("./formItemType/SearchInput"));

var _SearchSelect = _interopRequireDefault(require("./formItemType/SearchSelect"));

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
  'plain': _Plain["default"],
  'input': _Input["default"],
  'search-input': _SearchInput["default"],
  'search-select': _SearchSelect["default"]
});