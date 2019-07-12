import React, { Fragment, useState } from 'react';
import useBaseList from 'zero-element/lib/helper/list/useBaseList';
import { useDidMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { getModel } from 'zero-element/lib/Model';

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

function displayName(data, key) {
  if (data) {
    if (typeof data === 'object') {
      return data[key];
    }
    return data;
  }
  return '点击选择';
}

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

function unique(arr) {
  const rst = [];
  const uniqueObj = {};
  arr.forEach(item => {
    if(!uniqueObj[item.id]) {
      uniqueObj[item.id] = true;
      rst.push(item);
    }
  })
  return rst;
}

export default function SearchTree(props) {
  const classes = useStyles();
  const { value, options, namespace, onChange } = props;
  const model = getModel(namespace);

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
  function handleSave(rowData) {
    console.log(1111, unique(rowData));
    // onChange(rowData);
    // switchOpenState();
  }
  function queryData(data) {
    onGetList({
      current: 1,
      pageSize: 5,
      queryData: data,
    });
  }

  const testData = [
    {
      id: 1,
      name: 'a',
      title: 'Baran',
      birthYear: 1987,
      birthCity: 63,
      sex: 'Male',
      type: 'adult',
    },
    {
      id: 2,
      name: 'b',
      title: 'Baran',
      birthYear: 1987,
      birthCity: 34,
      sex: 'Female',
      type: 'adult',
      parentId: 1,
    },
    {
      id: 3,
      name: 'c',
      title: 'Baran',
      birthYear: 1987,
      birthCity: 34,
      sex: 'Female',
      type: 'child',
      parentId: 1,
    },
    {
      id: 4,
      name: 'd',
      title: 'Baran',
      birthYear: 1987,
      birthCity: 34,
      sex: 'Female',
      type: 'child',
      parentId: 3,
    },
    {
      id: 5,
      name: 'e',
      title: 'Baran',
      birthYear: 1987,
      birthCity: 34,
      sex: 'Female',
      type: 'child',
    },
    {
      id: 6,
      name: 'f',
      title: 'Baran',
      birthYear: 1987,
      birthCity: 34,
      sex: 'Female',
      type: 'child',
      parentId: 5,
    },
  ];

  return <Fragment>
    <Button variant="contained" onClick={switchOpenState}>
      {displayName(value, nameField)}
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
            data={testData}
            options={{
              search: false,
              toolbar: false,
              selection: true,
            }}
            parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
            onSelectionChange={handleSave}
            onChangePage={handleChangePage}
          />
        </div>
      </div>
    </Dialog>

  </Fragment>
}