import React from 'react';
import loadable from '@loadable/component';
import CircularProgress from '@material-ui/core/CircularProgress';


export default (path) => {
  return loadable(() => import(`../${path}`), {
    fallback: <CircularProgress />,
  });;
}