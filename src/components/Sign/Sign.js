import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Sign.css';


import FormsBox from '../FormsBox/FormsBox.js'
import FormInput from '../FormInput/FormInput.js'

function Profile(props) {

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigate = useNavigate();

  const hendleSubmit = (evt) => {
    evt.preventDefault();
    if (props.display === 'signup') {
      navigate(props.switchToWhenSubmit, { replace: true });
    } else if (props.display === 'signin') {
      props.handleLoggedIn();
      navigate(props.switchToWhenSubmit, { replace: true });
    }
  };

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSwitchTo = () => {
    navigate(props.switchTo, { replace: true });
  }

  return (
    <>
      <FormsBox
        display={props.display}
        heading={props.heading}
        submitButtonTag={props.submitButtonTag}
        linkButtonSignature={props.linkButtonSignature}
        linkButtonTag={props.linkButtonTag}
        hendleSubmit={hendleSubmit}
        handleSwitchTo={handleSwitchTo}
      >
        <fieldset className={`${props.display}`}>
          {props.display === 'signup' && <FormInput
            display={props.display}
            label='Имя'
            name='username'
            type='text'
            placeholder='Введите имя'
            required={true}
            value={name}
            handleChangeValue={handleChangeName}
          />}
          <FormInput
            display={props.display}
            label='E-mail'
            name='email'
            type='email'
            placeholder='Введите E-mail'
            required={true}
            value={email}
            handleChangeValue={handleChangeEmail}
          />
          <FormInput
            display={props.display}
            label='Пароль'
            name='password'
            type='password'
            placeholder='Введите пароль'
            required={true}
            value={password}
            handleChangeValue={handleChangePassword}
          />
        </fieldset>
      </FormsBox>
    </>
  );
};

export default Profile;