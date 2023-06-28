import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import './App.css';

import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import PageNotFound from '../PageNotFound/PageNotFound.js';
import Profile from '../Profile/Profile.js';

import Sign from '../Sign/Sign.js'

function App() {

  const location = useLocation();

  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleLoggedIn = () => {
    setLoggedIn(true);
  };

  const handleLoggedOut = () => {
    setLoggedIn(false);
  };

  const [navigationPopupIsOpen, setNavigationPopupIsOpen] = React.useState(false);

  const openNavigationPopup = () => {
    setNavigationPopupIsOpen(true);
  };

  const closeNavigationPopup = () => {
    setNavigationPopupIsOpen(false);
  };

  const handleCloseEvent = (evt) => {
    if (evt.type === 'click') {
      const isOverlay = evt.target.classList.contains('navigation-popup');
      const isCloseButton = evt.target.classList.contains('navigation-popup__close-button');
      if (isOverlay || isCloseButton) {
        closeNavigationPopup();
      };
    } else if (evt.type === 'keydown') { if (evt.key === 'Escape') { closeNavigationPopup(); } };
  };

  return (
    <div className="app">
      {(location.pathname === '/' || location.pathname === '/movies' ||
        location.pathname === '/saved-movies' || location.pathname === '/profile') &&
        (<Header
          display={location.pathname}
          loggedIn={loggedIn}
          handleCloseEvent={handleCloseEvent}
          openNavigationPopup={openNavigationPopup}
          closeNavigationPopup={closeNavigationPopup}
          navigationPopupIsOpen={navigationPopupIsOpen}
        />)
      }
      <Routes>
        <Route path='/' element={<Main
          display='main'
          loggedIn={loggedIn}
        />} />
        <Route path='/movies' element={<Movies
          display='movies'
          loggedIn={loggedIn}
        />} />
        <Route path='/saved-movies' element={<Movies
          display='saved-movies'
          loggedIn={loggedIn}
        />} />
        <Route path='/profile' element={<Profile
          display='profile'
          loggedIn={loggedIn}
          handleLoggedOut={handleLoggedOut}
        />} />
        <Route path='/signin'
          element={
            <Sign
              display='signin'
              heading='Рады видеть!'
              submitButtonTag='Войти'
              linkButtonSignature='Ещё не зарегистрированы?'
              linkButtonTag='Регистрация'
              switchTo='/signup'
              switchToWhenSubmit='/'
              handleLoggedIn={handleLoggedIn}
            />
          }
        />
        <Route path='/signup'
          element={
            <Sign
              display='signup'
              heading='Добро пожаловать!'
              submitButtonTag='Зарегистрироваться'
              linkButtonSignature='Уже зарегистрированы?'
              linkButtonTag='Войти'
              switchTo='/signin'
              switchToWhenSubmit='/signin'
            />
          }
        />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div >
  );
};

export default App;
