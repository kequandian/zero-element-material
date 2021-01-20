"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SearchSelect;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _useBaseList = _interopRequireDefault(require("zero-element/lib/helper/list/useBaseList"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _styles = require("@material-ui/core/styles");

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _Slide = _interopRequireDefault(require("@material-ui/core/Slide"));

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _NormalTable = _interopRequireDefault(require("../components/NormalTable"));

var _NormalForm = _interopRequireDefault(require("../components/NormalForm"));

var _format = require("../utils/format");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      marginTop: theme.status.frameHeight
    },
    appBar: {
      position: 'relative',
      marginBottom: '8px'
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1
    },
    search: {
      padding: '0 10px'
    }
  };
});

var Transition = /*#__PURE__*/_react["default"].forwardRef(function Transition(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(_Slide["default"], (0, _extends2["default"])({
    direction: "up",
    ref: ref
  }, props));
});

function SearchSelect(_ref) {
  var _ref$value = _ref.value,
      value = _ref$value === void 0 ? {} : _ref$value,
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
      _options$API = options.API,
      API = _options$API === void 0 ? {} : _options$API,
      idField = options.idField,
      nameField = options.nameField,
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
    modelPath: 'listData'
  }, config);
  var loading = listProps.loading,
      data = listProps.data,
      handle = listProps.handle,
      modelStatus = listProps.modelStatus;
  var onGetList = handle.onGetList,
      onClearList = handle.onClearList;

  var _useState3 = (0, _react.useState)(value[nameField]),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      v = _useState4[0],
      setV = _useState4[1];

  (0, _lifeCycle.useDidMount)(function (_) {
    if (API.listAPI) {
      onGetList({});
    }
  });
  (0, _react.useEffect)(function (_) {
    setV(value[nameField] || '');
  }, [value, nameField]);
  (0, _lifeCycle.useWillUnmount)(onClearList);

  function switchOpenState() {
    setOpen(!open);
  }

  function handleChangePage(page) {
    console.log('handleChangePage', page);
  }

  function handleSave(e, rowData) {
    var id = rowData[idField];

    if (id) {
      onChange(rowData);
      switchOpenState();
    }
  }

  function queryData(data) {
    onGetList({
      current: 1,
      pageSize: 5,
      queryData: data
    });
  }

  return /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: "contained",
    onClick: switchOpenState
  }, v || '请选择'), /*#__PURE__*/_react["default"].createElement(_Dialog["default"], {
    fullScreen: true,
    open: open,
    onClose: switchOpenState,
    TransitionComponent: Transition
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react["default"].createElement(_AppBar["default"], {
    className: classes.appBar
  }, /*#__PURE__*/_react["default"].createElement(_Toolbar["default"], null, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
    edge: "start",
    color: "inherit",
    onClick: switchOpenState,
    "aria-label": "Close"
  }, /*#__PURE__*/_react["default"].createElement(_Close["default"], null)), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    variant: "h6",
    className: classes.title
  }, title))), /*#__PURE__*/_react["default"].createElement("div", null, field ? /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.search
  }, /*#__PURE__*/_react["default"].createElement(_NormalForm["default"], {
    onSubmit: queryData,
    config: {
      fields: [{
        field: field,
        type: 'search-input',
        options: _objectSpread({
          onSubmit: queryData
        }, restSearch)
      }]
    }
  })) : null, /*#__PURE__*/_react["default"].createElement(_NormalTable["default"], {
    isLoading: loading,
    columns: (0, _format.formatTableFields)(fields),
    data: data,
    options: {
      search: false,
      toolbar: false
    },
    onRowClick: handleSave,
    onChangePage: handleChangePage
  })))));
}