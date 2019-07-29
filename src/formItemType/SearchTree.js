import React, { Fragment, useState, useRef } from 'react';

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

import { formatTableFields } from '../utils/format';
import { query } from 'zero-element/lib/utils/request';

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
  button: {
    fontSize: '1.25em',
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
  const { value = [], options, onChange } = props;
  const selected = useRef([]);

  const [open, setOpen] = useState(false);
  const { title = 'title', API = {},
    fields = [], search = {},
  } = options;
  const { field, placeholder } = search;

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

  function fetchTableData(data) {
    const { search } = data;
    return new Promise((res, rej) => {
      query(API.listAPI, {
        [field]: search,
      }).then(response => {
        const { code, data } = response.data;
        if (code === 200) {
          res({
            data: data.records,
            page: data.total === 0 ? 0 : data.current - 1,
            totalCount: data.pages,
          });
        } else {
          rej();
        }
      });
    });
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
            <IconButton edge="start" color="inherit"
              onClick={switchOpenState}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
            <Button color="inherit" className={classes.button}
              onClick={handleSave}
            >
              保存
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          <NormalTable
            title={''}
            columns={formatTableFields(fields)}
            data={fetchTableData}
            options={{
              search: Boolean(field),
              toolbar: true,
              selection: true,
            }}
            placeholder={placeholder}
            parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
            onSelectionChange={handleSelected}
            onChangePage={handleChangePage}
          />
        </div>
      </div>
    </Dialog>

  </Fragment>
}