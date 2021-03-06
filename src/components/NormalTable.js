import React, { forwardRef, useEffect, useRef, useReducer } from 'react';
import MaterialTable from "material-table";

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const localization = {
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
    lastTooltip: '末页',
  },
  toolbar: {
    nRowsSelected: '已选择 {0} 条',
    searchPlaceholder: '搜索',
  },
  header: {
    actions: '操作'
  },
  body: {
    emptyDataSourceMessage: '暂无数据',
    filterRow: {
      filterTooltip: '过滤',
    }
  }
};

const style = {
  boxShadow: 'none',
};
export default function NormalTable(props) {
  const { placeholder, ...rest } = props;
  const Table = useRef(null);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(_ => {
    Table.current = <MaterialTable
      icons={tableIcons}
      localization={{
        ...localization,
        toolbar: {
          nRowsSelected: '已选择 {0} 条',
          searchPlaceholder: placeholder,
        }
      }}
      style={style}
      {...rest}
    />
    forceUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data, props.isLoading]);

  return Table.current;
}