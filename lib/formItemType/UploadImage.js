"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = UploadImage;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _format = require("zero-element/lib/utils/format");

var _request = require("zero-element/lib/utils/request");

var _materialUiDropzone = require("material-ui-dropzone");

var initFileList = [];

function UploadImage(props) {
  var name = props.name,
      value = props.value,
      options = props.options,
      namespace = props.namespace,
      onChange = props.onChange,
      rest = (0, _objectWithoutProperties2["default"])(props, ["name", "value", "options", "namespace", "onChange"]);
  var _options$API = options.API,
      API = _options$API === void 0 ? '/api/upload/files' : _options$API,
      _options$max = options.max,
      max = _options$max === void 0 ? 9 : _options$max;

  var _useState = (0, _react.useState)(initFileList),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      fileList = _useState2[0],
      setFileList = _useState2[1]; // const [loading, setLoading] = useState(false);


  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      visible = _useState4[0],
      setViseble = _useState4[1];

  var fAPI = (0, _format.formatAPI)(API, {
    namespace: namespace
  });
  (0, _react.useEffect)(function (_) {
    if (fileList === initFileList) {
      setFileList(format(value));
    }
  }, [fileList, value]);

  function handleOpen() {
    setViseble(true);
  }

  function handleClose() {
    setViseble(false);
  }

  function handleChange(files) {
    var api = /^http(s){0,1}:\/\//.test(API) ? API : fAPI;
    (0, _request.upload)(api, files).then(function (data) {
      console.log('上传结果: ', data); // onChange();

      handleClose();
    });
  }

  return _react["default"].createElement("div", {
    className: "clearfix"
  }, _react["default"].createElement(_Button["default"], {
    variant: "contained",
    color: "primary",
    component: "span",
    onClick: handleOpen
  }, "\u4E0A\u4F20"), _react["default"].createElement(_materialUiDropzone.DropzoneDialog, {
    dialogTitle: "\u4E0A\u4F20\u56FE\u7247",
    dropzoneText: "\u70B9\u51FB\u6216\u62D6\u62FD\u56FE\u7247\u5230\u8FD9\u91CC",
    cancelButtonText: "\u53D6\u6D88",
    submitButtonText: "\u4E0A\u4F20",
    open: visible,
    onClose: handleClose,
    onSave: handleChange,
    showPreviews: false,
    showPreviewsInDropzone: true,
    showAlerts: false,
    acceptedFiles: ['image/jpeg', 'image/png', 'image/bmp'],
    filesLimit: max
  }));
}

function format(value) {
  var rst = [];

  try {
    if (typeof value === 'string') {
      rst = JSON.parse(value);
    } else if (Array.isArray(value)) {
      rst = value;
    }
  } catch (e) {// rst.push(value);
  }

  rst.length > 0 && rst.map(function (item, index) {
    rst[index] = (0, _objectSpread2["default"])({}, item, {
      uid: index,
      status: 'done'
    });
  });
  return rst;
}