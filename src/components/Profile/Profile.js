import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Profile.css';

import FormsBox from '../FormsBox/FormsBox.js';
import FormInput from '../FormInput/FormInput.js';

function Profile(props) {

  const [editingDisabled, setEditingDisabled] = React.useState(true);
  const [name, setName] = React.useState('Павел');
  const [email, setEmail] = React.useState('pochta@yandex.ru');

  const navigate = useNavigate();

  const hendleEditing = () => {
    setEditingDisabled(false);
    setName('');
    setEmail('');
  }

  const hendleSubmit = (evt) => {
    evt.preventDefault();
    setEditingDisabled(true);
    navigate(-1, { replace: true });
  };

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handleLoggedOut = () => {
    props.handleLoggedOut();
    navigate('/', { replace: true });
  }

  return (
    <>
      <FormsBox
        display={props.display}
        heading='Привет, Павел!'
        submitButtonTag='Сохранить'
        buttonEditingTag='Редактировать'
        buttonLoggedOutTag='Выйти из аккаунта'
        hendleEditing={hendleEditing}
        editingDisabled={editingDisabled}
        handleLoggedOut={handleLoggedOut}
        hendleSubmit={hendleSubmit}>
        <fieldset className="profile" disabled={editingDisabled ? 'disabled' : null} >
          <FormInput
            display={props.display}
            label='Имя'
            name='username'
            type='text'
            placeholder='Введите имя'
            required={true}
            value={name}
            handleChangeValue={handleChangeName}
          />
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
        </fieldset>
      </FormsBox>
    </>
  );
};

export default Profile;