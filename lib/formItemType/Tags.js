"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Tags;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Chip = _interopRequireDefault(require("@material-ui/core/Chip"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _TagFaces = _interopRequireDefault(require("@material-ui/icons/TagFaces"));

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding: theme.spacing(0.5)
    },
    chip: {
      margin: theme.spacing(0.5)
    }
  };
});

function Tags() {
  var classes = useStyles();

  var _React$useState = _react["default"].useState([{
    key: 0,
    label: '会议1'
  }, {
    key: 1,
    label: '会议2'
  }, {
    key: 2,
    label: '会议3'
  }, {
    key: 4,
    label: '会议4'
  }, {
    key: 5,
    label: '会议5'
  }]),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      chipData = _React$useState2[0],
      setChipData = _React$useState2[1];

  var handleDelete = function handleDelete(chipToDelete) {
    return function () {
      if (chipToDelete.label === 'React') {
        alert('Why would you want to delete React?! :)');
        return;
      }

      setChipData(function (chips) {
        return chips.filter(function (chip) {
          return chip.key !== chipToDelete.key;
        });
      });
    };
  };

  return _react["default"].createElement(_Paper["default"], {
    className: classes.root
  }, chipData.map(function (data) {
    var icon;

    if (data.label === 'React') {
      icon = _react["default"].createElement(_TagFaces["default"], null);
    }

    return _react["default"].createElement(_Chip["default"], {
      key: data.key,
      icon: icon,
      label: data.label,
      onDelete: handleDelete(data),
      className: classes.chip
    });
  }));
}