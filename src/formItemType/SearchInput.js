import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 320,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
});

export default function CustomizedInputBase({ name, options }) {
  const classes = useStyles();
  const { onSubmit, placeholder = '请输入' } = options;
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value)
  }
  function handleSubmit() {
    onSubmit({
      [name]: value,
    });
  }

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      <IconButton className={classes.iconButton} onClick={handleSubmit}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}