import React from 'react';
import Popper from '@material-ui/core/Popper';
import { Render } from 'zero-element-global/lib/formItemType';
import './index.css';

export default function FormItemWrapped({ label, type, input, meta, options, ...rest }) {
  const visibleError = Boolean(meta.error && meta.touched);
  if (type === 'empty') {
    return <></>;
  }
  return <div className="ZEleM-Form-item">
    {label ? (
      <label className="ZEleM-Form-item-label">
        {`${label}:`}
      </label>
    ) : null}
    <Popper
      open={visibleError}
      className="ZEleM-Form-ruleTips"
    >
      <Render n={type}
        className={`ZEleM-Form-item-element ${visibleError ? 'ZEleM-Form-ruleTips-error' : ''}`}
        options={options} {...input} {...rest}
      />
    </Popper>
  </div>
}