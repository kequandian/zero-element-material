"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SearchTree;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

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

var _format = require("../utils/format");

var _request = require("zero-element/lib/utils/request");

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
    button: {
      fontSize: '1.25em'
    },
    search: {
      padding: '0 10px'
    }
  };
});

var Transition = _react["default"].forwardRef(function Transition(props, ref) {
  return _react["default"].createElement(_Slide["default"], (0, _extends2["default"])({
    direction: "up",
    ref: ref
  }, props));
});

function unique(arr) {
  var rst = [];
  var uniqueObj = {};
  arr.forEach(function (item) {
    if (item && !uniqueObj[item.id]) {
      uniqueObj[item.id] = true;
      rst.push(item);
    }
  });
  return rst;
}

function SearchTree(props) {
  var classes = useStyles();
  var _props$value = props.value,
      value = _props$value === void 0 ? [] : _props$value,
      options = props.options,
      onChange = props.onChange;
  var selected = (0, _react.useRef)([]);

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var _options$title = options.title,
      title = _options$title === void 0 ? 'title' : _options$title,
      _options$API = options.API,
      API = _options$API === void 0 ? {} : _options$API,
      _options$fields = options.fields,
      fields = _options$fields === void 0 ? [] : _options$fields,
      _options$search = options.search,
      search = _options$search === void 0 ? {} : _options$search,
      _options$type = options.type,
      type = _options$type === void 0 ? 'checkbox' : _options$type,
      _options$valueField = options.valueField,
      valueField = _options$valueField === void 0 ? 'id' : _options$valueField;
  var field = search.field,
      placeholder = search.placeholder;

  function switchOpenState() {
    setOpen(!open);
  }

  function handleChangePage(page) {
    console.log('handleChangePage', page);
  }

  function handleSelected(rowData) {
    selected.current = rowData;
  }

  function handleSave() {
    var data;

    if (type === 'checkbox') {
      data = unique([].concat(value, selected.current));
    } else {
      data = selected.current[0][valueField];
    }

    onChange(data);
    setOpen(false);
  }

  function fetchTableData(data) {
    var search = data.search;
    return new Promise(function (res, rej) {
      (0, _request.query)(API.listAPI, (0, _defineProperty2["default"])({}, field, search)).then(function (response) {
        var _response$data = response.data,
            code = _response$data.code,
            data = _response$data.data;

        if (code === 200) {
          if (Array.isArray(data)) {
            res({
              data: Array.isArray(data) ? data : data.records,
              page: 0,
              totalCount: 0
            });
          } else {
            res({
              data: data.records,
              page: data.total === 0 ? 0 : data.current - 1,
              totalCount: data.pages
            });
          }
        } else {
          rej();
        }
      });
    });
  }

  return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(_Button["default"], {
    variant: "contained",
    onClick: switchOpenState
  }, typeof value === 'string' ? value : '点击选择'), _react["default"].createElement(_Dialog["default"], {
    fullScreen: true,
    open: open,
    onClose: switchOpenState,
    TransitionComponent: Transition
  }, _react["default"].createElement("div", {
    className: classes.root
  }, _react["default"].createElement(_AppBar["default"], {
    className: classes.appBar
  }, _react["default"].createElement(_Toolbar["default"], null, _react["default"].createElement(_IconButton["default"], {
    edge: "start",
    color: "inherit",
    onClick: switchOpenState
  }, _react["default"].createElement(_Close["default"], null)), _react["default"].createElement(_Typography["default"], {
    variant: "h6",
    className: classes.title
  }, title), _react["default"].createElement(_Button["default"], {
    color: "inherit",
    className: classes.button,
    onClick: handleSave
  }, "\u4FDD\u5B58"))), _react["default"].createElement("div", null, _react["default"].createElement(_NormalTable["default"], {
    title: '',
    columns: (0, _format.formatTableFields)(fields),
    data: fetchTableData,
    options: {
      search: Boolean(field),
      toolbar: true,
      selection: true
    },
    placeholder: placeholder,
    parentChildData: function parentChildData(row, rows) {
      return rows.find(function (a) {
        return a.id === row.parentId;
      });
    },
    onSelectionChange: handleSelected,
    onChangePage: handleChangePage
  })))));
}