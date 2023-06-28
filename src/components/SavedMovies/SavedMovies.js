import React from 'react';

import './SavedMovies.css';

import Header from '../Header/Header.js';

import Footer from '../Footer/Footer.js';


function SavedMovies(props) {
  return (
    <>
      <Header display='saved-movies' />
      <main>
        <p>сохраненные фильмы</p>
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;