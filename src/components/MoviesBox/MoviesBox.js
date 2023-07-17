import './MoviesBox.css';

function MoviesBox(props) {
  return (
    <section className="movies-box" aria-label="Фильмотека">
      <ul className="movies-box__list">
        {props.children}
      </ul>
      {props.display === "movies" &&
        (!props.buttonMoreOff ?
          <button className="movies-box__button-more" type="button" onClick={props.handleClickMore}>Ещё</button> :
          <div className="movies-box__plug"></div>
        )
      }
      {props.display === "saved-movies" && (<div className="movies-box__plug"></div>)}
    </section>
  );
}

export default MoviesBox;