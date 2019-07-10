import React from 'react';
import { Render } from 'zero-element-global/lib/formItemType';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  field: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  label: {
    marginRight: theme.spacing(2),
  },
  element: {
    flex: 1,
  },
}));

const Required = () => <span style={{ color: 'red' }}>*</span>;

export default function FormItemWrapped({
  label, type, input, meta, options,
  required,
  ...rest
}) {
  const visibleError = Boolean(meta.error && meta.touched);
  const classes = useStyles();

  if (type === 'empty') {
    return <></>;
  }
  return <div className={classes.field}>
    {label ? (
      <label className={classes.label}>
        {required ? <Required /> : null}
        {`${label}:`}
      </label>
    ) : null}
    <Render n={type}
      className={classes.element}
      options={options} {...input} {...rest}
      error={visibleError}
    />
  </div>
}