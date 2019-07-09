import React, { Fragment, useState, useEffect } from 'react';
import useBaseList from 'zero-element/lib/helper/list/useBaseList';
import { useDidMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import NormalTable from '../components/NormalTable';
import NormalForm from '../components/NormalForm';

import { formatTableFields } from '../utils/format';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.status.frameHeight,
  },
  appBar: {
    position: 'relative',
    marginBottom: '8px',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  search: {
    padding: '0 10px',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SearchSelect({ value, options, namespace, onChange }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const { title = 'title', API = {},
    idField, nameField, echoField = nameField,
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
  const { formData } = modelStatus;
  const [v, setV] = useState(value);
  const formDataValue = formData[echoField];

  useDidMount(_ => {
    if (API.listAPI) {
      onGetList({});
    }
  });
  useEffect(_ => {
    setV(formDataValue || '');
  }, [formDataValue]);
  useWillUnmount(onClearList);

  function switchOpenState() {
    setOpen(!open);
  }
  function handleChangePage(page) {
    console.log('handleChangePage', page);
  }
  function handleSave(e, rowData) {
    onChange(rowData[idField]);
    setV(rowData[nameField]);
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
      {v}
    </Button>
    <Dialog
      fullScreen={true}
      open={open}
      onClose={switchOpenState}
      TransitionComponent={Transition}
    >
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={switchOpenState} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
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
      </div>
      {/* <DialogActions>
        <Button onClick={switchOpenState} color="primary">
          取消
        </Button>
      </DialogActions> */}
    </Dialog>

  </Fragment>
}