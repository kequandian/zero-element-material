import React from 'react';
import Input from '@material-ui/core/Input';

export default ({ props, ...rest }) => {
  return <Input {...rest} {...props} />
}