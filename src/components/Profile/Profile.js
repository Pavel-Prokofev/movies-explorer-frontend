import React from 'react';
import { useLocation } from 'react-router-dom';

import './Profile.css';

import FormsBox from '../FormsBox/FormsBox.js';
import FormInput from '../FormInput/FormInput.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Profile(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [editingDisabled, setEditingDisabled] = React.useState(true);

  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/profile') {
      props.name.handleResetValue(currentUser.name);
      props.email.handleResetValue(currentUser.email);
      props.handleSubmitButtonErrorText('Введите новые данные хотябы в одно поле.')
    }
  }, [location]);

  const handleEditing = () => {
    setEditingDisabled(false);
  }

  return (
    <>
      <FormsBox
        display={props.display}
        heading={props.heading}
        submitButtonTag={props.submitButtonTag}
        buttonEditingTag={props.buttonEditingTag}
        buttonLoggedOutTag={props.buttonLoggedOutTag}
        handleLoggedOut={props.handleLoggedOut}
        handleEditing={handleEditing}
        editingDisabled={editingDisabled}
        formIsValid={props.formIsValid}
        submitButtonErrorText={props.submitButtonErrorText}
        handleSubmit={props.handleSubmit}>
        <fieldset className="profile" disabled={editingDisabled ? 'disabled' : null} >
          <FormInput
            display={props.display}
            label='Имя'
            name='username'
            type='text'
            placeholder='Введите имя'
            input={props.name}
          />
          <FormInput
            display={props.display}
            label='E-mail'
            name='email'
            type='email'
            placeholder='Введите E-mail'
            input={props.email}
          />
        </fieldset>
      </FormsBox>
    </>
  );
};

export default Profile;