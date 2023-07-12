import './Movie.css';

function Movie(props) {

  const likeStatus = () => {
    return props.likedMoviesArr.some(likedMovie => likedMovie.movieId === props.movie.movieId);
  };

  const likeToggle = () => {
    props.setPreloaderOn(true);
    if (likeStatus() || props.display === 'saved-movies') {
      if (props.display === 'saved-movies') {
        props.handleDislikeMovie(props.movie._id);
      } else if (props.display === 'movies') {
        const actuaLikedlMovie = props.likedMoviesArr.find((likedMovie) => likedMovie.movieId === props.movie.movieId);
        if (actuaLikedlMovie._id) {
          props.handleDislikeMovie(actuaLikedlMovie._id);
        }
      } else {
        console.log('При дислайке карточки что то пошло не так.');
        props.setPreloaderOn(false);
      }
    } else {
      props.handleLikeMovie(props.movie);
    };
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
    <li className="movie">
      <a href={props.movie.trailerLink} className="movie__link" target="_blank" rel="noreferrer">
        <img className="movie__img" src={props.movie.image} alt={props.movie.nameRU} />
      </a>
      <div className="movie__info-wrap">
        <div className="movie__info-box">
          <p className="movie__title">{props.movie.nameRU}</p>
          <button type="button"
            className={`
              movie__status-botton
              ${props.display === 'movies' ?
                (likeStatus() ?
                  'movie__status-botton_like-on' :
                  'movie__status-botton_like-off'
                ) : (
                  props.display === 'saved-movies' &&
                  'movie__status-botton_delete-like'
                )
              }
            `}
            onClick={likeToggle}
          ></button>
        </div>
        <span className="movie__duration">{time(props.movie.duration)}</span>
      </div>
    </li>
  );
};

export default Movie;