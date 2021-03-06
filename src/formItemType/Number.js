import React from 'react';
import TextField from '@material-ui/core/TextField';

export default ({ props = {}, ...rest }) => {
  const { value, defaultValue, onChange, className } = rest;
  return <TextField className={className}
    value={value || defaultValue || 0}
    onChange={onChange}
    {...props}
    type="number"
  />
}