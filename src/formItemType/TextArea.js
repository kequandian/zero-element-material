import React from 'react';
import TextField from '@material-ui/core/TextField';

export default ({ props = {}, ...rest }) => {
  const { value, defaultValue, onChange, className, options } = rest;
  const {rows = 4} = options;

  return <TextField className={className}
    value={value || defaultValue || ''}
    onChange={onChange}
    {...props}
    multiline
    rows={rows}
  />
}