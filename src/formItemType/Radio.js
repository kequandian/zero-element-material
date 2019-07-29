import React from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const booleanMap = {
  'true': true,
  'false': false,
};
export default (props) => {
  const { value, options = [], onChange } = props;
  function handleChange(e) {
    const v = e.target.value;
    if (onChange) {
      const fValue = booleanMap[v] || v;
      onChange(fValue === value ? undefined : fValue);
    }
  }

  return <RadioGroup
    name="position"
    value={String(value)}
    onChange={handleChange}
    row
  >
    {options.map(opt => {
      return <FormControlLabel
        key={opt.value}
        label={opt.label}
        value={String(opt.value)}
        control={<Radio color="primary" />}
        labelPlacement="end"
      />
    })}
  </RadioGroup>
}