import React from 'react';

import useValidation from '../customUse/useValidation.js'

const useInput = (initialValue, validations) => {
  const [value, setValue] = React.useState(initialValue);
  const [isDirty, setIsDirty] = React.useState(false);
  const valid = useValidation(value, validations);

  const handleChangeValue = (evt) => {
    setValue(evt.target.value)
  };

  const handleResetValue = (value) => {
    const resetValue = value ? value : '';
    setValue(resetValue);
    setIsDirty(false);
  };

  const onInput = () => {
    setIsDirty(true);
  };

  return {
    value,
    handleChangeValue,
    handleResetValue,
    onInput,
    isDirty,
    ...valid
  };
};

export default useInput;