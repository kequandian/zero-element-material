"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SearchTree;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireWildcard(require("react"));

var _useBaseList = _interopRequireDefault(require("zero-element/lib/helper/list/useBaseList"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _Model = require("zero-element/lib/Model");

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

function displayName(data, key) {
  if (data) {
    if ((0, _typeof2["default"])(data) === 'object') {
      return data[key];
    }

    return data;
  }

  return '点击选择';
}

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
    if (!uniqueObj[item.id]) {
      uniqueObj[item.id] = true;
      rst.push(item);
    }
  });
  return rst;
}

function SearchTree(props) {
  var classes = useStyles();
  var value = props.value,
      options = props.options,
      namespace = props.namespace,
      onChange = props.onChange;
  var model = (0, _Model.getModel)(namespace);

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

  function handleSave(rowData) {
    console.log(1111, unique(rowData)); // onChange(rowData);
    // switchOpenState();
  }

  function queryData(data) {
    onGetList({
      current: 1,
      pageSize: 5,
      queryData: data
    });
  }

  var testData = [{
    id: 1,
    name: 'a',
    title: 'Baran',
    birthYear: 1987,
    birthCity: 63,
    sex: 'Male',
    type: 'adult'
  }, {
    id: 2,
    name: 'b',
    title: 'Baran',
    birthYear: 1987,
    birthCity: 34,
    sex: 'Female',
    type: 'adult',
    parentId: 1
  }, {
    id: 3,
    name: 'c',
    title: 'Baran',
    birthYear: 1987,
    birthCity: 34,
    sex: 'Female',
    type: 'child',
    parentId: 1
  }, {
    id: 4,
    name: 'd',
    title: 'Baran',
    birthYear: 1987,
    birthCity: 34,
    sex: 'Female',
    type: 'child',
    parentId: 3
  }, {
    id: 5,
    name: 'e',
    title: 'Baran',
    birthYear: 1987,
    birthCity: 34,
    sex: 'Female',
    type: 'child'
  }, {
    id: 6,
    name: 'f',
    title: 'Baran',
    birthYear: 1987,
    birthCity: 34,
    sex: 'Female',
    type: 'child',
    parentId: 5
  }];
  return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(_Button["default"], {
    variant: "contained",
    onClick: switchOpenState
  }, displayName(value, nameField)), _react["default"].createElement(_Dialog["default"], {
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
    onClick: switchOpenState,
    "aria-label": "Close"
  }, _react["default"].createElement(_Close["default"], null)), _react["default"].createElement(_Typography["default"], {
    variant: "h6",
    className: classes.title
  }, title))), _react["default"].createElement("div", null, field ? _react["default"].createElement("div", {
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
    data: testData,
    options: {
      search: false,
      toolbar: false,
      selection: true
    },
    parentChildData: function parentChildData(row, rows) {
      return rows.find(function (a) {
        return a.id === row.parentId;
      });
    },
    onSelectionChange: handleSave,
    onChangePage: handleChangePage
  })))));
}