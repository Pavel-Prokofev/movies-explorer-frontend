import React from 'react';

const useValidation = (value, validations) => {

  const isEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isNameRegex = /^[a-zа-яё\s-]*$/;
  const isEmptiRegex = /^\s+$/;
  const isNotStartWhitespaceRegex = /^[^\s]/;
  const isNotEndWhitespaceRegex = /[^\s]$/;

  const [isEmpti, setIsEmpti] = React.useState(true);
  const [isNotWhitespace, setIsNotWhitespace] = React.useState(false);
  const [minLengthError, setMinLengthError] = React.useState(false);
  const [maxLengthError, setMaxLengthError] = React.useState(false);
  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [inputValid, setInputValid] = React.useState(false);

  React.useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpti' || isEmptiRegex.test(String(value).toLowerCase()):
          value ?
            setIsEmpti(false) :
            setIsEmpti(true);
          break;
        case 'isNotWhitespace':
          isNotStartWhitespaceRegex.test(String(value).toLowerCase()) && isNotEndWhitespaceRegex.test(String(value).toLowerCase()) ?
            setIsNotWhitespace(false) :
            setIsNotWhitespace(true);
          break;
        case 'minLength':
          value.length < validations[validation] ?
            setMinLengthError(true) :
            setMinLengthError(false);
          break;
        case 'maxLength':
          value.length > validations[validation] ?
            setMaxLengthError(true) :
            setMaxLengthError(false);
          break;
        case 'name':
          !isNameRegex.test(String(value).toLowerCase()) ?
            setNameError(true) :
            setNameError(false);
          break;
        case 'email':
          !isEmailRegex.test(String(value).toLowerCase()) ?
            setEmailError(true) :
            setEmailError(false);
          break;

        //  no default
      }
    }
  }, [value]);

  React.useEffect(() => {
    if (isEmpti || isNotWhitespace || minLengthError || maxLengthError || nameError || emailError) {
      setInputValid(false);
      if (isEmpti) {
        setErrorText('Это поле должно быть заполнено.')
      } else if (isNotWhitespace) {
        setErrorText('Пробел в начале и конце недопустим.')
      } else if (minLengthError) {
        setErrorText(`В этом поле должно быть не менее ${validations.minLength} символов.`)
      } else if (maxLengthError) {
        setErrorText(`В этом поле должно быть не более ${validations.maxLength} символов.`)
      } else if (nameError) {
        setErrorText('Допустимы: латиница, кириллица, пробел и дефис.')
      } else if (emailError) {
        setErrorText('Некорректный Email.')
      }

    } else {
      setInputValid(true);
      setErrorText('');
    };
  }, [isEmpti, minLengthError, maxLengthError, nameError, emailError, isNotWhitespace])

  return {
    inputValid,
    errorText,
  }

}

export default useValidation;