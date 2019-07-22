import React, { Fragment, useState, useRef } from 'react';
import useBaseList from 'zero-element/lib/helper/list/useBaseList';
import { useDidMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { get } from 'zero-element-global/lib/APIConfig';

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

function unique(arr) {
  const rst = [];
  const uniqueObj = {};
  arr.forEach(item => {
    if (item && !uniqueObj[item.id]) {
      uniqueObj[item.id] = true;
      rst.push(item);
    }
  })
  return rst;
}

export default function SearchTree(props) {
  const classes = useStyles();
  const { value = [], options, namespace, onChange } = props;
  const selected = useRef([]);

  const [open, setOpen] = useState(false);
  const { title = 'title', API = {},
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

  const { loading, data: listData, handle, modelStatus, dispatch } = listProps;
  const { onClearList } = handle;

  useDidMount(_ => {
    if (API.listAPI) {
      fetchData({});
    }
  });
  useWillUnmount(onClearList);

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
    const data = unique([].concat(value, selected.current));
    onChange(data);
    setOpen(false);
  }
  function queryData(data) {
    fetchData({
      queryData: data,
      rest: true,
    });
  }
  function fetchData({ current = 1, queryData = {}, rest = false }) {
    const response = dispatch({
      type: 'fetchList',
      API: API.listAPI,
      MODELPATH: 'listData_SearchInput',
      DIRECTRETURN: true,
      payload: {
        ...queryData,
        current,
        pageSize: 25,
      },
    });
    response.then((code, data) => {
      if (code === 200) {
        const records = data[get('FIELD_records')];
        const uniqueRecords = rest ? records : unique([].concat(listData, records));

        dispatch({
          type: 'save',
          payload: {
            'listData_SearchInput': {
              current: data[get('FIELD_current')],
              pageSize: data[get('FIELD_pageSize')],
              total: data[get('FIELD_total')],
              records: uniqueRecords,
            },
          }
        })
      }
    })
  }

  return <Fragment>
    <Button variant="contained" onClick={switchOpenState}>
      点击选择
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
            <IconButton edge="start" color="inherit" onClick={handleSave} aria-label="Close">
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
            data={listData}
            options={{
              search: false,
              toolbar: false,
              selection: true,
            }}
            parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
            onSelectionChange={handleSelected}
            onChangePage={handleChangePage}
          />
        </div>
      </div>
    </Dialog>

  </Fragment>
}