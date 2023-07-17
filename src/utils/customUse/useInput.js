import React from 'react';

import useValidation from '../customUse/useValidation.js'

const useInput = (initialValue, validations) => {
  const [value, setValue] = React.useState(initialValue);
  const [isDirty, setIsDirty] = React.useState(false);
  const valid = useValidation(value, validations);

  const handleChangeValue = (evt) => {
    setValue(evt.target.value)
    valid.handleErrorText();
  };

  const handleResetValue = (value) => {
    const resetValue = value ? value : '';
    setValue(resetValue);
    setIsDirty(false);
    valid.handleErrorText();
  };

  const handleChangeErrorText = (err) => {
    valid.handleErrorText(err);
    onInput();
  }

  const onInput = () => {
    setIsDirty(true);
  };

  return {
    value,
    handleChangeValue,
    handleResetValue,
    handleChangeErrorText,
    onInput,
    isDirty,
    ...valid
  };
};

export default useInput;