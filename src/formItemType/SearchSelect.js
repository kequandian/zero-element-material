import React, { Fragment, useState } from 'react';
import useBaseList from 'zero-element/lib/helper/list/useBaseList';
import { useDidMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import NormalTable from '../components/NormalTable';
import NormalForm from '../components/NormalForm';

import { formatTableFields } from '../utils/format';

function displayName(data, key) {
  if (data) {
    if (typeof data === 'object') {
      return data[key];
    }
    return data;
  }
  return '点击选择';
}

const useStyles = makeStyles({
  search: {
    padding: '0 10px',
  },
});

export default ({ value, options, namespace, onChange }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const { title = 'title', nameField, API = {},
    fields = [], search = {},
  } = options;
  const { field = 'search', ...restSearch } = search;
  const config = {
    API,
    fields,
  };
  const listProps = useBaseList({
    namespace,
    modelPath: 'listData_SearchInput',
  }, config);
  const { loading, data, handle, modelStatus } = listProps;
  const { onGetList, onClearList } = handle;

  useDidMount(_ => {
    if (API.listAPI) {
      onGetList({});
    }
  });
  useWillUnmount(onClearList);

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
      queryData: data,
    });
  }

  return <Fragment>
    <Button variant="contained" onClick={switchOpenState}>
      {displayName(value, nameField)}
    </Button>
    <Dialog
      fullWidth={true}
      open={open}
      onClose={switchOpenState}
    >
      <DialogTitle>{title}</DialogTitle>
      <div>
        {field ? (
          <div className={classes.search}>
            <NormalForm
              onSubmit={queryData}
              config={{
                fields: [
                  {
                    field, type: 'search-input', options: {
                      onSubmit: queryData,
                      ...restSearch,
                    }
                  }
                ]
              }}
            />
          </div>
        ) : null}
        <NormalTable
          isLoading={loading}
          columns={formatTableFields(fields)}
          data={data}
          options={{
            search: false,
            toolbar: false,
          }}
          onRowClick={handleSave}
          onChangePage={handleChangePage}
        />
      </div>
      {/* <DialogActions>
        <Button onClick={switchOpenState} color="primary">
          取消
        </Button>
      </DialogActions> */}
    </Dialog>

  </Fragment>
}