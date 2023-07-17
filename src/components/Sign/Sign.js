import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import './Sign.css';

import FormsBox from '../FormsBox/FormsBox.js'
import FormInput from '../FormInput/FormInput.js'

function Sign(props) {

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/signin' || location.pathname === '/signup') {
      location.pathname === '/signup' && props.name.handleResetValue('');
      props.email.handleResetValue('');
      props.password.handleResetValue('');
      props.handleSubmitButtonErrorText(props.getUserInfoErrorText ? props.getUserInfoErrorText : '');
    }
  }, [location]);

  const handleGetUserInfoErrorText = () => {
    props.handleGetUserInfoErrorText && props.handleGetUserInfoErrorText();
  }

  const handleSwitchTo = () => {
    navigate(props.switchTo, { replace: true });
    handleGetUserInfoErrorText();
  }

  return (
    <>
      <FormsBox
        display={props.display}
        heading={props.heading}
        submitButtonTag={props.submitButtonTag}
        linkButtonSignature={props.linkButtonSignature}
        linkButtonTag={props.linkButtonTag}
        handleSubmit={props.handleSubmit}
        handleSwitchTo={handleSwitchTo}
        formIsValid={props.formIsValid}
        submitButtonErrorText={props.submitButtonErrorText}
        handleSubmitButtonErrorText={props.handleSubmitButtonErrorText}
        handleGetUserInfoErrorText={handleGetUserInfoErrorText}
      >
        <fieldset className={`${props.display}`}>
          {props.display === 'signup' &&
            <FormInput
              display={props.display}
              label='Имя'
              name='username'
              type='text'
              placeholder='Введите имя'
              input={props.name}
            />}
          <FormInput
            display={props.display}
            label='E-mail'
            name='email'
            type='email'
            placeholder='Введите E-mail'
            input={props.email}
          />
          <FormInput
            display={props.display}
            label='Пароль'
            name='password'
            type='password'
            placeholder='Введите пароль'
            input={props.password}
          />
        </fieldset>
      </FormsBox>
    </>
  );
};

export default Sign;