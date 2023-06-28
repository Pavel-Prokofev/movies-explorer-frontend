import React from 'react';

import './Movie.css';

function Movie(props) {

  const [likeStatus, setLikeStatus] = React.useState(false);
  const [deliteStatus, setDeliteStatus] = React.useState(false);

  React.useEffect(() => {
    setLikeStatus(props.movie.like);
  }, []);

  function likeToggle() {
    setLikeStatus(!likeStatus);
  }

  function deliteMovie() {
    setDeliteStatus(true)
  }

  const time = (duration) => {
    if (Number.isInteger(duration) & duration >= 0) {
      const hours = Math.trunc(duration / 60);
      const minutes = duration % 60;
      const time = (hours + 'ч ' + minutes + 'м');
      return time;
    };
    return '--ч --м';
  };

  return (
    <li className={`movie ${deliteStatus && 'movie_simulation-of-deletion'}`}>
      <a href={props.movie.trailerLink} className="movie__link" target="_blank" rel="noreferrer">
      <img className="movie__img" src={`https://api.nomoreparties.co${props.movie.image}`} alt={props.movie.nameRU} />
      </a>
      <div className="movie__info-wrap">
        <div className="movie__info-box">
          <p className="movie__title">{props.movie.nameRU}</p>
          <button type="button"
            className={`
              movie__status-botton
              ${props.display === 'movies' ?
                (likeStatus ?
                  'movie__status-botton_like-on' :
                  'movie__status-botton_like-off'
                ) : (
                  props.display === 'saved-movies' &&
                  'movie__status-botton_delete-like'
                )
              }
          `}
            onClick=
            {() => {
              props.display === 'movies' && likeToggle()
              props.display === 'saved-movies' && deliteMovie()
            }}
          ></button>
        </div>
        <span className="movie__duration">{time(props.movie.duration)}</span>
      </div>
    </li>
  );
};

export default Movie;