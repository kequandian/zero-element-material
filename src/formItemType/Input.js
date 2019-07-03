import React from 'react';
import TextField from '@material-ui/core/TextField';

export default ({ props, ...rest }) => {
  return <TextField {...rest} {...props} />
}