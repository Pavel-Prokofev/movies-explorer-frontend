import './MoviesBox.css';

function MoviesBox(props) {
  return (
    <section className="movies-box" aria-label="Фильмотека">
      <ul className="movies-box__list">
        {props.children}
      </ul>
      {props.display === "movies" && (<button className="movies-box__button-more" type="button">Ещё</button>)}
      {props.display === "saved-movies" && (<div className="movies-box__plug"></div>)}
    </section>
  );
}

export default MoviesBox;