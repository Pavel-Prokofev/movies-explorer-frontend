import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import './App.css';

import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import PageNotFound from '../PageNotFound/PageNotFound.js';
import Profile from '../Profile/Profile.js';
import Sign from '../Sign/Sign.js'
import Preloader from '../Preloader/Preloader.js'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

import useInput from '../../utils/customUse/useInput.js'

import moviesApi from '../../utils/api/MoviesApi.js';
import mainApi from '../../utils/api/MainApi.js'

function App() {

  const location = useLocation();
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [formIsValid, setFormIsValid] = React.useState(false);
  const [submitButtonErrorText, setSubmitButtonErrorText] = React.useState('');
  const [getUserInfoErrorText, setGetUserInfoErrorText] = React.useState('');

  const name = useInput('', { isEmpti: true, isNotWhitespace: true, name: true, minLength: 2, maxLength: 30 });
  const email = useInput('', { isEmpti: true, email: true });
  const password = useInput('', { isEmpti: true, minLength: 7 });

  const [checkedValue, setCheckedValue] = React.useState(false);
  const searchValue = useInput('', { isEmpti: true, alterError: true });
  const [actualSearch, setActualSearch] = React.useState({
    lastCheckedValue: false,
    lastSearchValue: ''
  });

  const [allMoviesArr, setAllMoviesArr] = React.useState([]);
  const [allShortMoviesArr, setAllShortMoviesArr] = React.useState([]);
  const [likedMoviesArr, setLikedMoviesArr] = React.useState([]);

  const [loadingErrorText, setLoadingErrorText] = React.useState('');

  const [preloaderOn, setPreloaderOn] = React.useState(true);

  const handleSubmitButtonErrorText = (value) => {
    const resetValue = value ? value : '';
    setSubmitButtonErrorText(resetValue);
  };

  const handleGetUserInfoErrorText = (value) => {
    const resetValue = value ? value : '';
    setGetUserInfoErrorText(resetValue);
  };

  const handleLoggedIn = (user, pathname) => {
    setCurrentUser(user);
    setLoggedIn(true);
    pathname && navigate(pathname, { replace: true });
  };

  const handleLoggedOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('lastSearch');
    setCurrentUser({});
    navigate('/', { replace: true });
    setLoggedIn(false);
    setAllMoviesArr([]);
    setAllShortMoviesArr([]);
    setLikedMoviesArr([]);
  };

  React.useEffect(() => {
    setSubmitButtonErrorText('');
    const jwt = localStorage.getItem('jwt');
    const lastLocation = location.pathname;
    if (jwt) {
      setPreloaderOn(true);
      mainApi.getUserInfo()
        .then((res) => {
          if (res) {
            const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
            if (!lastSearch || typeof lastSearch.lastCheckedValue !== 'object') {
              localStorage.setItem('lastSearch', JSON.stringify({ lastCheckedValue: false, lastSearchValue: '', lastLikedCheckedValue: false, lastLikedSearchValue: '' }));
            } else if (typeof lastSearch.lastCheckedValue !== 'boolean') {
              lastSearch.lastCheckedValue = false;
            } else if (typeof lastSearch.lastSearchValue !== 'string') {
              lastSearch.lastSearchValue = '';
            } else if (typeof lastSearch.lastLikedCheckedValue !== 'boolean') {
              lastSearch.lastLikedCheckedValue = false;
            } else if (typeof lastSearch.lastLikedSearchValue !== 'string') {
              lastSearch.lastLikedSearchValue = '';
            };
            localStorage.setItem('lastSearch', JSON.stringify(lastSearch));
            if (lastSearch.lastSearchValue) {
              handleGetAllMoviesArr();
            };
            setActualSearch(JSON.parse(localStorage.getItem('lastSearch')));
            handleLoggedIn(res, lastLocation);
          }
        })
        .catch((err) => {
          if (err === 401) {
            setGetUserInfoErrorText('При авторизации произошла ошибка. Переданный токен некорректен, пожалуйста авторизируйтесь.');
            handleLoggedOut();
          } else if (err === 404) {
            setGetUserInfoErrorText('Пользователь по переданному токену не обнаружен, пожалуйста авторизируйтесь.');
            handleLoggedOut();
          } else if (err === 500) {
            setGetUserInfoErrorText('На сервере произошла ошибка.');
          } else {
            setGetUserInfoErrorText(`Что-то пошло не так! Попробуйте ещё раз. Error: ${err}`);
          }
          navigate('/signin', { replace: true });
        })
        .finally(() => {
          setPreloaderOn(false);
        });
    } else {
      setPreloaderOn(false);
    }
  }, [])

  const handleUserRegister = ({ name, email, password }) => {
    if (name && email && password) {
      handleSubmitButtonErrorText();
      setPreloaderOn(true);
      mainApi.userRegistration({ name, email, password })
        .then((res) => {
          if (res.token && res.user) {
            localStorage.setItem('jwt', res.token);
            localStorage.setItem('lastSearch', JSON.stringify({ lastCheckedValue: false, lastSearchValue: '', lastLikedCheckedValue: false, lastLikedSearchValue: '' }));
            handleLoggedIn(res.user, '/movies');
          } else {
            setSubmitButtonErrorText('При регистрации на сервере произошла ошибка.');
          }
        })
        .catch((err) => {
          if (err === 409) {
            setSubmitButtonErrorText('Пользователь с таким email уже существует.');
          } else if (err === 500) {
            setSubmitButtonErrorText('На сервере произошла ошибка.');
          } else {
            setSubmitButtonErrorText(`При регистрации произошла ошибка. Error: ${err}`);
          }
        })
        .finally(() => {
          setPreloaderOn(false);
        });
    } else {
      setSubmitButtonErrorText('При регистрации произошла ошибка.');
    };
  };

  const handleUserLogin = ({ email, password }) => {
    if (email && password) {
      handleSubmitButtonErrorText();
      handleGetUserInfoErrorText();
      setPreloaderOn(true);
      mainApi.userAuthenticate({ email, password })
        .then((res) => {
          if (res.token && res.user) {
            localStorage.setItem('jwt', res.token);
            localStorage.setItem('lastSearch', JSON.stringify({ lastCheckedValue: false, lastSearchValue: '', lastLikedCheckedValue: false, lastLikedSearchValue: '' }));
            handleLoggedIn(res.user, '/movies');
          } else {
            setSubmitButtonErrorText('При авторизации на сервере произошла ошибка.');
          }
        })
        .catch((err) => {
          if (err === 401) {
            setSubmitButtonErrorText('Вы ввели неправильный логин или пароль.');
          } else if (err === 500) {
            setSubmitButtonErrorText('На сервере произошла ошибка.');
          } else {
            setSubmitButtonErrorText(`При авторизации произошла ошибка. Error: ${err}`);
          }
        })
        .finally(() => {
          setPreloaderOn(false);
        });
    } else {
      setSubmitButtonErrorText('При авторизации произошла ошибка.');
    };
  };

  const handlePatchUserInfo = ({ name, email }) => {
    if (name && email) {
      handleSubmitButtonErrorText();
      setPreloaderOn(true);
      mainApi.patchUserInfo({ name, email })
        .then((res) => {
          if (res) {
            handleLoggedIn(res);
            setFormIsValid(false);
            setSubmitButtonErrorText('Поздравляем, ваши данные были успешно обновлены! Если хотите сменить их вновь, введите новые данные хотябы в одно поле.');
          } else {
            setSubmitButtonErrorText('При обновлении профиля на сервере произошла ошибка.');
          }
        })
        .catch((err) => {
          if (err === 409) {
            setSubmitButtonErrorText('Пользователь с таким email уже существует.');
          } else if (err === 500) {
            setSubmitButtonErrorText('На сервере произошла ошибка.');
          } else {
            setSubmitButtonErrorText(`При обновлении профиля произошла ошибка. Error: ${err}`);
          }
        })
        .finally(() => {
          setPreloaderOn(false);
        });
    } else {
      setSubmitButtonErrorText('При обновлении профиля произошла ошибка.');
    };
  };

  React.useEffect(() => {
    if (location.pathname === '/signin') {
      if (email.inputValid && password.inputValid) {
        setFormIsValid(true);
      } else {
        setFormIsValid(false);
      };
    } else if (location.pathname === '/signup') {
      if (name.inputValid && email.inputValid && password.inputValid) {
        setFormIsValid(true);
      } else {
        setFormIsValid(false);
      };
    } else if (location.pathname === '/profile') {
      if (name.value === currentUser.name && email.value === currentUser.email) {
        setFormIsValid(false);
        setSubmitButtonErrorText('Введите новые данные хотябы в одно поле.');
      } else {
        setSubmitButtonErrorText('');
        if (name.inputValid && email.inputValid) {
          setFormIsValid(true);
        } else {
          setFormIsValid(false);
        };
      }
    };
  }, [name.inputValid, email.inputValid, password.inputValid, name.value, email.value])

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (formIsValid) {
      if (location.pathname === '/signin') {
        handleUserLogin({ email: email.value, password: password.value });
      } else if (location.pathname === '/signup') {
        handleUserRegister({ name: name.value, email: email.value, password: password.value });
      } else if (location.pathname === '/profile') {
        handlePatchUserInfo({ name: name.value, email: email.value });
      };;
    };
  };

  React.useEffect(() => {
    if (loggedIn) {
      setLoadingErrorText('')
      setPreloaderOn(true);
      mainApi.getAllLikedMovies()
        .then((res) => {
          setLikedMoviesArr(res);
        })
        .catch((err) => {
          setLoadingErrorText(`Во время запроса избранных фильмов произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз: ${err}.`);
          setLikedMoviesArr([]);
        })
        .finally(() => {
          setPreloaderOn(false);
        });
    };
  }, [loggedIn]);

  const handleGetAllMoviesArr = () => {
    if (allMoviesArr.length === 0) {
      setPreloaderOn(true);
      setLoadingErrorText('')
      moviesApi.getAllMovies()
        .then((res) => {
          if (res) {
            const allMoviesArr = res.map((getMovie) => {
              const movie = {
                country: getMovie.country,
                director: getMovie.director,
                duration: getMovie.duration,
                year: getMovie.year,
                description: getMovie.description,
                image: `https://api.nomoreparties.co${getMovie.image.url}`,
                trailerLink: getMovie.trailerLink,
                thumbnail: `https://api.nomoreparties.co${getMovie.image.formats.thumbnail.url}`,
                movieId: getMovie.id,
                nameRU: getMovie.nameRU,
                nameEN: getMovie.nameEN
              };
              return movie;
            });
            const allShortMoviesArr = allMoviesArr.filter((movie) => movie.duration <= 40);
            setAllShortMoviesArr(allShortMoviesArr);
            setAllMoviesArr(allMoviesArr);
            setActualSearch(JSON.parse(localStorage.getItem('lastSearch')));
          } else {
            return Promise.reject(res.status);
          }
        })
        .catch((err) => {
          setLoadingErrorText(`Во время запроса фильмов произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз: ${err}.`);
          setAllMoviesArr([]);
          setAllShortMoviesArr([]);
        })
        .finally(() => {
          setPreloaderOn(false);
        });
    }
  }

  const handleLikeMovie = (movie) => {
    if (movie) {
      mainApi.postNewMovie(movie)
        .then((newLikedMovie) => {
          setLikedMoviesArr([...likedMoviesArr, newLikedMovie]);
        })
        .catch((err) => {
          console.log(`При лайке карточки что то пошло не так. Подождите немного и попробуйте ещё раз: ${err}.`);
        })
        .finally(() => {
          setPreloaderOn(false);
        });
    } else {
      console.log('При лайке карточки что то пошло не так.');
      setPreloaderOn(false);
    }
  }

  const handleDislikeMovie = (dellMovieId) => {
    if (dellMovieId) {
      mainApi.delMovie(dellMovieId)
        .then(() => {
          setLikedMoviesArr(likedMoviesArr.filter((movie) => movie._id !== dellMovieId));
        })
        .catch((err) => {
          console.log(`При дислайке карточки что то пошло не так. Подождите немного и попробуйте ещё раз: ${err}.`);
        })
        .finally(() => {
          setPreloaderOn(false);
        });
    } else {
      console.log('При дислайке карточки что то пошло не так.');
      setPreloaderOn(false);
    }
  }

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
        />} />
        <Route path='/movies' element={<ProtectedRoute
          element={<Movies
            display='movies'
            handleGetAllMoviesArr={handleGetAllMoviesArr}
            checkedValue={checkedValue}
            searchValue={searchValue}
            setCheckedValue={setCheckedValue}
            actualSearch={actualSearch}
            setActualSearch={setActualSearch}
            allMoviesArr={allMoviesArr}
            allShortMoviesArr={allShortMoviesArr}
            likedMoviesArr={likedMoviesArr}
            loadingErrorText={loadingErrorText}
            setPreloaderOn={setPreloaderOn}
            handleLikeMovie={handleLikeMovie}
            handleDislikeMovie={handleDislikeMovie}
          />}
          loggedIn={loggedIn}
          elsePath="/signin"
        />} />
        <Route path='/saved-movies' element={<ProtectedRoute
          element={<Movies
            display='saved-movies'
            handleGetAllMoviesArr={handleGetAllMoviesArr}
            checkedValue={checkedValue}
            searchValue={searchValue}
            setCheckedValue={setCheckedValue}
            actualSearch={actualSearch}
            setActualSearch={setActualSearch}
            allMoviesArr={allMoviesArr}
            likedMoviesArr={likedMoviesArr}
            loadingErrorText={loadingErrorText}
            setPreloaderOn={setPreloaderOn}
            handleDislikeMovie={handleDislikeMovie}
          />}
          loggedIn={loggedIn}
          elsePath="/signin"
        />} />
        <Route path='/profile' element={<ProtectedRoute
          element={
            <CurrentUserContext.Provider value={currentUser}>
              <Profile
                display='profile'
                heading={`Привет, ${currentUser.name}!`}
                submitButtonTag='Сохранить'
                buttonEditingTag='Редактировать'
                buttonLoggedOutTag='Выйти из аккаунта'
                handleLoggedOut={handleLoggedOut}
                formIsValid={formIsValid}
                handleSubmit={handleSubmit}
                submitButtonErrorText={submitButtonErrorText}
                handleSubmitButtonErrorText={handleSubmitButtonErrorText}
                name={name}
                email={email}
              />
            </CurrentUserContext.Provider>
          }
          loggedIn={loggedIn}
          elsePath="/signin"
        />} />
        <Route path='/signin'
          element={<ProtectedRoute
            element={<Sign
              display='signin'
              heading='Рады видеть!'
              submitButtonTag='Войти'
              linkButtonSignature='Ещё не зарегистрированы?'
              linkButtonTag='Регистрация'
              switchTo='/signup'
              handleSubmit={handleSubmit}
              submitButtonErrorText={submitButtonErrorText}
              handleSubmitButtonErrorText={handleSubmitButtonErrorText}
              formIsValid={formIsValid}
              email={email}
              password={password}
              getUserInfoErrorText={getUserInfoErrorText}
              handleGetUserInfoErrorText={handleGetUserInfoErrorText}
            />}
            loggedIn={!loggedIn}
            elsePath="/"
          />}
        />
        <Route path='/signup'
          element={<ProtectedRoute
            element={<Sign
              display='signup'
              heading='Добро пожаловать!'
              submitButtonTag='Зарегистрироваться'
              linkButtonSignature='Уже зарегистрированы?'
              linkButtonTag='Войти'
              switchTo='/signin'
              handleSubmit={handleSubmit}
              submitButtonErrorText={submitButtonErrorText}
              handleSubmitButtonErrorText={handleSubmitButtonErrorText}
              formIsValid={formIsValid}
              name={name}
              email={email}
              password={password}
            />}
            loggedIn={!loggedIn}
            elsePath="/"
          />}
        />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Preloader preloaderOn={preloaderOn} />
    </div >
  );
};

export default App;