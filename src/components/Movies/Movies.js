import React from 'react';
import { useLocation } from 'react-router-dom';

import './Movies.css';

import MoviesSearcher from '../MoviesSearcher/MoviesSearcher.js'
import MoviesBox from '../MoviesBox/MoviesBox.js';
import Movie from '../Movie/Movie.js';
import Footer from '../Footer/Footer.js';

function Movies(props) {

  const location = useLocation();

  const [actualMoviesArr, setActualMoviesArr] = React.useState([]);
  const [listOfMovies, setListOfMovies] = React.useState([]);
  const [limitedListOfMovies, setLimitedListOfMovies] = React.useState([]);
  const [windowInnerWidth, setWindowInnerWidth] = React.useState(0);
  const [more, setMore] = React.useState(0);
  const [buttonMoreOff, setButtonMoreOff] = React.useState(false);
  const [criticalDisplayResize, setCriticalDisplayResize] = React.useState(0);

  React.useEffect(() => {
    let actualMoviesArr = [];
    const actualSearch = JSON.parse(localStorage.getItem('lastSearch'));

    if (props.loadingErrorText) {
      props.searchValue.handleChangeErrorText(props.loadingErrorText);
    } else {

      if (location.pathname === '/movies') {
        props.searchValue.handleResetValue(actualSearch.lastSearchValue);
        props.setCheckedValue(actualSearch.lastCheckedValue)

        if (props.allMoviesArr.length !== 0) {
          if (actualSearch.lastCheckedValue) {
            actualMoviesArr = props.allShortMoviesArr.filter((movie) => {
              return (movie.nameRU.toLowerCase().includes(actualSearch.lastSearchValue.toLowerCase()) ||
                movie.nameEN.toLowerCase().includes(actualSearch.lastSearchValue.toLowerCase()))
            });
          } else {
            actualMoviesArr = props.allMoviesArr.filter((movie) => {
              return (movie.nameRU.toLowerCase().includes(actualSearch.lastSearchValue.toLowerCase()) ||
                movie.nameEN.toLowerCase().includes(actualSearch.lastSearchValue.toLowerCase()))
            });
          }
          if (actualMoviesArr.length === 0 && actualSearch.lastSearchValue) {
            props.searchValue.handleChangeErrorText('Ничего не найдено.');
          }
        }
      }

      if (location.pathname === '/saved-movies') {
        props.searchValue.handleResetValue(actualSearch.lastLikedSearchValue);
        props.setCheckedValue(actualSearch.lastLikedCheckedValue)

        if (props.likedMoviesArr.length !== 0) {

          actualMoviesArr = props.likedMoviesArr.filter((movie) => {
            return (movie.nameRU.toLowerCase().includes(actualSearch.lastLikedSearchValue.toLowerCase()) ||
              movie.nameEN.toLowerCase().includes(actualSearch.lastLikedSearchValue.toLowerCase()))
          });

          if (actualSearch.lastLikedCheckedValue) {
            const shortActualMoviesArr = actualMoviesArr.filter((movie) => movie.duration <= 40);
            actualMoviesArr = shortActualMoviesArr;
          }

          if (actualMoviesArr.length === 0 && actualSearch.lastLikedSearchValue) {
            props.searchValue.handleChangeErrorText('Ничего не найдено.');
          }

        } else {
          props.searchValue.handleChangeErrorText('В избранном пока что пусто.')
        };
      };
    }

    setActualMoviesArr(actualMoviesArr);
  }, [props.actualSearch, location, props.loadingErrorText, props.likedMoviesArr])

  React.useEffect(() => {
    const listOfMovies = actualMoviesArr.map((movie) => <Movie
      key={movie.movieId}
      movie={movie}
      display={props.display}
      setPreloaderOn={props.setPreloaderOn}
      handleLikeMovie={props.handleLikeMovie}
      handleDislikeMovie={props.handleDislikeMovie}
      likedMoviesArr={props.likedMoviesArr}
    />)

    setButtonMoreOff(false);
    setListOfMovies(location.pathname === '/movies' ? listOfMovies : listOfMovies.reverse());
  }, [actualMoviesArr])

  React.useEffect(() => {
    if (location.pathname === '/movies') {
      window.addEventListener('resize', handleWindowResize);
    }
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [location]);

  const handleWindowResize = () => {
    setWindowInnerWidth(window.innerWidth);
  }

  const handleResetMore = () => {
    if (location.pathname === "/movies") {
      setMore(0);
    }
  }

  React.useEffect(() => {
    if (location.pathname === '/movies') {
      let counter;
      let primaryLimitListOfMovies;
      let limit;

      if (window.innerWidth < 482) {
        primaryLimitListOfMovies = 5;
        counter = (more * 2);
      } else if (window.innerWidth > 482 && window.innerWidth < 1024) {
        primaryLimitListOfMovies = 8;
        counter = (more * 2);
      } else {
        primaryLimitListOfMovies = 12;
        counter = (more * 3);
      };

      if (criticalDisplayResize !== primaryLimitListOfMovies) {
        setMore(0);
        setCriticalDisplayResize(primaryLimitListOfMovies)
      } else {

        limit = (primaryLimitListOfMovies + counter);

        if (limit >= listOfMovies.length) {
          limit = listOfMovies.length;
          setButtonMoreOff(true);
        } else { setButtonMoreOff(false); }

        setLimitedListOfMovies(listOfMovies.slice(0, limit));
      }
    }
  }, [listOfMovies, more, windowInnerWidth, criticalDisplayResize])

  const handleClickMore = () => {
    setMore(more + 1);
  }

  return (
    <>
      <main className="movies">
        <MoviesSearcher
          handleGetAllMoviesArr={props.handleGetAllMoviesArr}
          checkedValue={props.checkedValue}
          setCheckedValue={props.setCheckedValue}
          actualSearch={props.actualSearch}
          setActualSearch={props.setActualSearch}
          searchValue={props.searchValue}
          allMoviesArr={props.allMoviesArr}
          likedMoviesArr={props.likedMoviesArr}
          loadingErrorText={props.loadingErrorText}
          handleResetMore={handleResetMore}
        />
        <MoviesBox display={props.display} handleClickMore={handleClickMore} buttonMoreOff={buttonMoreOff}>
          {location.pathname === '/saved-movies' ?
            listOfMovies :
            limitedListOfMovies}
        </MoviesBox>
      </main>
      <Footer />
    </>
  );
};

export default Movies;