"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = NormalTable;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _materialTable = _interopRequireDefault(require("material-table"));

var _AddBox = _interopRequireDefault(require("@material-ui/icons/AddBox"));

var _ArrowUpward = _interopRequireDefault(require("@material-ui/icons/ArrowUpward"));

var _Check = _interopRequireDefault(require("@material-ui/icons/Check"));

var _ChevronLeft = _interopRequireDefault(require("@material-ui/icons/ChevronLeft"));

var _ChevronRight = _interopRequireDefault(require("@material-ui/icons/ChevronRight"));

var _Clear = _interopRequireDefault(require("@material-ui/icons/Clear"));

var _DeleteOutline = _interopRequireDefault(require("@material-ui/icons/DeleteOutline"));

var _Edit = _interopRequireDefault(require("@material-ui/icons/Edit"));

var _FilterList = _interopRequireDefault(require("@material-ui/icons/FilterList"));

var _FirstPage = _interopRequireDefault(require("@material-ui/icons/FirstPage"));

var _LastPage = _interopRequireDefault(require("@material-ui/icons/LastPage"));

var _Remove = _interopRequireDefault(require("@material-ui/icons/Remove"));

var _SaveAlt = _interopRequireDefault(require("@material-ui/icons/SaveAlt"));

var _Search = _interopRequireDefault(require("@material-ui/icons/Search"));

var _ViewColumn = _interopRequireDefault(require("@material-ui/icons/ViewColumn"));

var tableIcons = {
  Add: (0, _react.forwardRef)(function (props, ref) {
    return _react["default"].createElement(_AddBox["default"], (0, _extends2["default"])({}, props, {
      ref: ref
    }));
  }),
  Check: (0, _react.forwardRef)(function (props, ref) {
    return _react["default"].createElement(_Check["default"], (0, _extends2["default"])({}, props, {
      ref: ref
    }));
  }),
  Clear: (0, _react.forwardRef)(function (props, ref) {
    return _react["default"].createElement(_Clear["default"], (0, _extends2["default"])({}, props, {
      ref: ref
    }));
  }),
  Delete: (0, _react.forwardRef)(function (props, ref) {
    return _react["default"].createElement(_DeleteOutline["default"], (0, _extends2["default"])({}, props, {
      ref: ref
    }));
  }),
  DetailPanel: (0, _react.forwardRef)(function (props, ref) {
    return _react["default"].createElement(_ChevronRight["default"], (0, _extends2["default"])({}, props, {
      ref: ref
    }));
  }),
  Edit: (0, _react.forwardRef)(function (props, ref) {
    return _react["default"].createElement(_Edit["default"], (0, _extends2["default"])({}, props, {
      ref: ref
    }));
  }),
  Export: (0, _react.forwardRef)(function (props, ref) {
    return _react["default"].createElement(_SaveAlt["default"], (0, _extends2["default"])({}, props, {
      ref: ref
    }));
  }),
  Filter: (0, _react.forwardRef)(function (props, ref) {
    return _react["default"].createElement(_FilterList["default"], (0, _extends2["default"])({}, props, {
      ref: ref
    }));
  }),
  FirstPage: (0, _react.forwardRef)(function (props, ref) {
    return _react["default"].createElement(_FirstPage["default"], (0, _extends2["default"])({}, props, {
      ref: ref
    }));
  }),
  LastPage: (0, _react.forwardRef)(function (props, ref) {
    return _react["default"].createElement(_LastPage["default"], (0, _extends2["default"])({}, props, {
      ref: ref
    }));
  }),
  NextPage: (0, _react.forwardRef)(function (props, ref) {
    return _react["default"].createElement(_ChevronRight["default"], (0, _extends2["default"])({}, props, {
      ref: ref
    }));
  }),
  PreviousPage: (0, _react.forwardRef)(function (props, ref) {
    return _react["default"].createElement(_ChevronLeft["default"], (0, _extends2["default"])({}, props, {
      ref: ref
    }));
  }),
  ResetSearch: (0, _react.forwardRef)(function (props, ref) {
    return _react["default"].createElement(_Clear["default"], (0, _extends2["default"])({}, props, {
      ref: ref
    }));
  }),
  Search: (0, _react.forwardRef)(function (props, ref) {
    return _react["default"].createElement(_Search["default"], (0, _extends2["default"])({}, props, {
      ref: ref
    }));
  }),
  SortArrow: (0, _react.forwardRef)(function (props, ref) {
    return _react["default"].createElement(_ArrowUpward["default"], (0, _extends2["default"])({}, props, {
      ref: ref
    }));
  }),
  ThirdStateCheck: (0, _react.forwardRef)(function (props, ref) {
    return _react["default"].createElement(_Remove["default"], (0, _extends2["default"])({}, props, {
      ref: ref
    }));
  }),
  ViewColumn: (0, _react.forwardRef)(function (props, ref) {
    return _react["default"].createElement(_ViewColumn["default"], (0, _extends2["default"])({}, props, {
      ref: ref
    }));
  })
};
var localization = {
  pagination: {
    labelDisplayedRows: '{from}-{to} / {count}',
    labelRowsSelect: '行',
    labelRowsPerPage: '每页行数',
    firstAriaLabel: '首页',
    firstTooltip: '首页',
    previousAriaLabel: '上一页',
    previousTooltip: '上一页',
    nextAriaLabel: '下一页',
    nextTooltip: '下一页',
    lastAriaLabel: '末页',
    lastTooltip: '末页'
  },
  toolbar: {
    nRowsSelected: '已选择 {0} 条'
  },
  header: {
    actions: '操作'
  },
  body: {
    emptyDataSourceMessage: '暂无数据',
    filterRow: {
      filterTooltip: '过滤'
    }
  }
};
var style = {
  boxShadow: 'none'
};

function NormalTable(props) {
  var Table = (0, _react.useRef)(null);

  var _useReducer = (0, _react.useReducer)(function (x) {
    return x + 1;
  }, 0),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      forceUpdate = _useReducer2[1];

  (0, _react.useEffect)(function (_) {
    Table.current = _react["default"].createElement(_materialTable["default"], (0, _extends2["default"])({
      icons: tableIcons,
      localization: localization,
      style: style
    }, props));
    forceUpdate(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data, props.isLoading]);
  return Table.current;
}