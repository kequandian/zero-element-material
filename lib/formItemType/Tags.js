"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Tags;

var _react = _interopRequireWildcard(require("react"));

var _useBaseForm = _interopRequireDefault(require("zero-element/lib/helper/form/useBaseForm"));

var _styles = require("@material-ui/core/styles");

var _Chip = _interopRequireDefault(require("@material-ui/core/Chip"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    paper: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding: theme.spacing(0.5),
      width: '100%'
    },
    chip: {
      margin: theme.spacing(0.5)
    },
    empty: {
      color: '#666'
    }
  };
});

function Tags(props) {
  var classes = useStyles();
  var namespace = props.namespace,
      options = props.options,
      onChange = props.onChange,
      onSaveOther = props.onSaveOther;
  var field = options.field,
      _options$nameField = options.nameField,
      nameField = _options$nameField === void 0 ? 'title' : _options$nameField;
  var formProps = (0, _useBaseForm["default"])({
    namespace: namespace,
    modelPath: 'formData'
  }, {
    API: {},
    fields: []
  });
  var _formProps$data = formProps.data,
      data = _formProps$data === void 0 ? {} : _formProps$data,
      dispatch = formProps.dispatch;
  var chipData = data[field];
  (0, _react.useEffect)(function (_) {
    if (chipData) {
      onChange(chipData.map(function (i) {
        return i.id;
      }));
    }
  }, [chipData]);

  var handleDelete = function handleDelete(chipToDelete) {
    return function () {
      var fList = chipData.filter(function (chip) {
        return chip.id !== chipToDelete.id;
      });
      onSaveOther(field, fList);
    };
  };

  return _react["default"].createElement(_Paper["default"], {
    className: classes.paper
  }, chipData && chipData.length > 0 ? null : _react["default"].createElement("span", {
    className: classes.empty
  }, "\u6682\u65E0\u6570\u636E"), chipData && chipData.map(function (data) {
    return _react["default"].createElement(_Chip["default"], {
      key: data.id,
      label: data[nameField],
      onDelete: handleDelete(data),
      className: classes.chip
    });
  }));
}