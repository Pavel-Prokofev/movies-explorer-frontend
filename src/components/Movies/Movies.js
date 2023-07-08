import React from 'react';

import './Movies.css';

import { moviesArr } from '../../utils/constants.js'

import MoviesSearcher from '../MoviesSearcher/MoviesSearcher.js'
import MoviesBox from '../MoviesBox/MoviesBox.js';
import Movie from '../Movie/Movie.js';
import Footer from '../Footer/Footer.js';

function Movies(props) {

  let actualMoviesArr = [];

  if (props.display === "saved-movies") {
    actualMoviesArr = moviesArr.filter((movie) => movie.like)
  } else if (props.display === "movies") {
    actualMoviesArr = moviesArr;
  };

  const listOfMovies = actualMoviesArr.map((movie) => <Movie key={movie.id} movie={movie} display={props.display} />);

  return (
    <>
      <main className="movies">
        <MoviesSearcher onSearchSubmit={props.onSearchSubmit} />
        <MoviesBox display={props.display}>
          {listOfMovies}
        </MoviesBox>
      </main>
      <Footer />
    </>
  );
};

export default Movies;