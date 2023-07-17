import React from 'react';
import { useLocation } from 'react-router-dom';

const useValidation = (value, validations) => {

  const location = useLocation();

  const isEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isNameRegex = /^[a-zа-яё\s-]*$/;
  const isEmptiRegex = /^\s*$/;
  const isNotStartWhitespaceRegex = /^[^\s]/;
  const isNotEndWhitespaceRegex = /[^\s]$/;

  const [isEmpti, setIsEmpti] = React.useState(location.pathname !== '/saved-movies' ? true : false);
  const [isNotWhitespace, setIsNotWhitespace] = React.useState(false);
  const [minLengthError, setMinLengthError] = React.useState(false);
  const [maxLengthError, setMaxLengthError] = React.useState(false);
  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [inputValid, setInputValid] = React.useState(false);
  const [alterError, setAlterError] = React.useState(false);
  const [alterErrorText, setAlterErrorText] = React.useState('');

  const handleErrorText = (err) => {
    if (err) {
      setAlterErrorText(err);
    } else {
      setAlterErrorText('');
    }
  }

  React.useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'alterError':
          alterErrorText ?
            setAlterError(true) :
            setAlterError(false);
          break;
        case 'isEmpti':
          (location.pathname !== '/saved-movies') ? ((!value || isEmptiRegex.test(String(value).toLowerCase())) ?
            setIsEmpti(true) :
            setIsEmpti(false)) :
            setIsEmpti(false);
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
  }, [alterErrorText, value, location]);

  React.useEffect(() => {
    if (isEmpti || isNotWhitespace || minLengthError || maxLengthError || nameError || emailError) {
      setInputValid(false);
      if (isEmpti) {
        setErrorText((location.pathname === '/movies' || location.pathname === '/saved-movies') ? 'Нужно ввести ключевое слово.' : 'Это поле должно быть заполнено.');
      } else if (isNotWhitespace) {
        setErrorText('Пробел в начале и конце недопустим.');
      } else if (minLengthError) {
        setErrorText(`В этом поле должно быть не менее ${validations.minLength} символов.`);
      } else if (maxLengthError) {
        setErrorText(`В этом поле должно быть не более ${validations.maxLength} символов.`);
      } else if (nameError) {
        setErrorText('Допустимы: латиница, кириллица, пробел и дефис.');
      } else if (emailError) {
        setErrorText('Некорректный Email.');
      }
    } else {
      setInputValid(true);
      setErrorText('');
    };

    if (alterError) {
      setErrorText(alterErrorText);
    }
  }, [isEmpti, minLengthError, maxLengthError, nameError, emailError, isNotWhitespace, alterError, alterErrorText, location])

  return {
    inputValid,
    errorText,
    handleErrorText,
  }

}

export default useValidation;