import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { formatAPI } from 'zero-element/lib/utils/format';
import { upload } from 'zero-element/lib/utils/request';
import { DropzoneDialog } from 'material-ui-dropzone';

const initFileList = [];

export default function UploadImage(props) {
  const { name, value, options, namespace, onChange, ...rest } = props;
  const { API = '/api/upload/files', max = 9 } = options;
  const [fileList, setFileList] = useState(initFileList);
  // const [loading, setLoading] = useState(false);
  const [visible, setViseble] = useState(false);
  const fAPI = formatAPI(API, {
    namespace,
  });

  useEffect(_ => {
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
    const api = /^http(s){0,1}:\/\//.test(API) ? API : fAPI;
    upload(api, files)
      .then(data => {
        console.log('上传结果: ', data);
        // onChange();
        handleClose();
      })

  }

  return <div className="clearfix">
    <Button variant="contained" color="primary" component="span"
      onClick={handleOpen}
    >
      上传
    </Button>
    <DropzoneDialog
      dialogTitle="上传图片"
      dropzoneText="点击或拖拽图片到这里"
      cancelButtonText="取消"
      submitButtonText="上传"
      open={visible}
      onClose={handleClose}
      onSave={handleChange}
      showPreviews={false}
      showPreviewsInDropzone={true}
      showAlerts={false}
      acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
      filesLimit={max}
    />
  </div>
}

function format(value) {
  let rst = [];
  try {
    if (typeof (value) === 'string') {
      rst = JSON.parse(value);
    } else if (Array.isArray(value)) {
      rst = value;
    }
  } catch (e) {
    // rst.push(value);
  }
  rst.length > 0 && rst.map((item, index) => {
    rst[index] = {
      ...item,
      uid: index,
      status: 'done',
    }
  });
  return rst;
}