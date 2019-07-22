import React, { useEffect } from 'react';
import useBaseForm from 'zero-element/lib/helper/form/useBaseForm';
import { query } from 'zero-element/lib/utils/request';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    width: '100%',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  empty: {
    color: '#666',
  }
}));

export default function Tags(props) {
  const classes = useStyles();
  const { namespace, options, onChange, handle } = props;
  const { API, field, nameField = 'title' } = options;
  const { onSaveOther } = handle;

  const formProps = useBaseForm({
    namespace,
    modelPath: 'formData',
  }, { API: {}, fields: [] });
  const { data = {}, dispatch } = formProps;

  const chipData = data[field];

  useEffect(_ => {
    if (chipData) {
      onChange(chipData.map(i => i.id));
    } else {
      query(API).then(response => {
        const { code, data } = response.data;
        if (code === 200 && Array.isArray(data)) {
          dispatch({
            type: 'save',
            payload: {
              'formData': {
                [field]: data,
              }
            }
          });
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chipData])

  const handleDelete = chipToDelete => () => {
    const fList = chipData.filter(chip => chip.id !== chipToDelete.id);
    onSaveOther(field, fList);
  };

  return (
    <Paper className={classes.paper}>
      {chipData && chipData.length > 0 ? null : (
        <span className={classes.empty}>暂无数据</span>
      )}

      {chipData && chipData.map(data => {
        return (
          <Chip
            key={data.id}
            label={data[nameField]}
            onDelete={handleDelete(data)}
            className={classes.chip}
          />
        );
      })}
    </Paper>
  );
}