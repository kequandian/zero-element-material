"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireWildcard(require("react"));

var _useBaseList = _interopRequireDefault(require("zero-element/lib/helper/list/useBaseList"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _styles = require("@material-ui/core/styles");

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _NormalTable = _interopRequireDefault(require("../components/NormalTable"));

var _NormalForm = _interopRequireDefault(require("../components/NormalForm"));

var _format = require("../utils/format");

function displayName(data, key) {
  if (data) {
    if ((0, _typeof2["default"])(data) === 'object') {
      return data[key];
    }

    return data;
  }

  return '点击选择';
}

var useStyles = (0, _styles.makeStyles)({
  search: {
    padding: '0 10px'
  }
});

var _default = function _default(_ref) {
  var value = _ref.value,
      options = _ref.options,
      namespace = _ref.namespace,
      onChange = _ref.onChange;
  var classes = useStyles();

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var _options$title = options.title,
      title = _options$title === void 0 ? 'title' : _options$title,
      nameField = options.nameField,
      _options$API = options.API,
      API = _options$API === void 0 ? {} : _options$API,
      _options$fields = options.fields,
      fields = _options$fields === void 0 ? [] : _options$fields,
      _options$search = options.search,
      search = _options$search === void 0 ? {} : _options$search;
  var _search$field = search.field,
      field = _search$field === void 0 ? 'search' : _search$field,
      restSearch = (0, _objectWithoutProperties2["default"])(search, ["field"]);
  var config = {
    API: API,
    fields: fields
  };
  var listProps = (0, _useBaseList["default"])({
    namespace: namespace,
    modelPath: 'listData_SearchInput'
  }, config);
  var loading = listProps.loading,
      data = listProps.data,
      handle = listProps.handle,
      modelStatus = listProps.modelStatus;
  var onGetList = handle.onGetList,
      onClearList = handle.onClearList;
  (0, _lifeCycle.useDidMount)(function (_) {
    if (API.listAPI) {
      onGetList({});
    }
  });
  (0, _lifeCycle.useWillUnmount)(onClearList);

  function switchOpenState() {
    setOpen(!open);
  }

  function handleChangePage(page) {
    console.log('handleChangePage', page);
  }

  function handleSave(e, rowData) {
    onChange(rowData);
    switchOpenState();
  }

  function queryData(data) {
    onGetList({
      current: 1,
      pageSize: 5,
      queryData: data
    });
  }

  return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(_Button["default"], {
    variant: "contained",
    onClick: switchOpenState
  }, displayName(value, nameField)), _react["default"].createElement(_Dialog["default"], {
    fullWidth: true,
    open: open,
    onClose: switchOpenState
  }, _react["default"].createElement(_DialogTitle["default"], null, title), _react["default"].createElement("div", null, field ? _react["default"].createElement("div", {
    className: classes.search
  }, _react["default"].createElement(_NormalForm["default"], {
    onSubmit: queryData,
    config: {
      fields: [{
        field: field,
        type: 'search-input',
        options: (0, _objectSpread2["default"])({
          onSubmit: queryData
        }, restSearch)
      }]
    }
  })) : null, _react["default"].createElement(_NormalTable["default"], {
    isLoading: loading,
    columns: (0, _format.formatTableFields)(fields),
    data: data,
    options: {
      search: false,
      toolbar: false
    },
    onRowClick: handleSave,
    onChangePage: handleChangePage
  }))));
};

exports["default"] = _default;