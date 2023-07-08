import './MoviesSearcher.css';

function MoviesSearcher(props) {

const handleSubmit = (evt) => {
  evt.preventDefault();
  props.onSearchSubmit();
}

  return (
    <section className="movies-searcher" aria-label="Поисковик фильмов">
      <form name="movies-searcher" className="movies-searcher__form" noValidate onSubmit={handleSubmit}>
        <input type="search" name="desired-movie" id="movies-input" className="movies-searcher__input" placeholder="Фильм" required />
        <button type="submit" className="movies-searcher__submit-button"></button>
      </form>

      <label className="movies-searcher__toggle">
        <input className="movies-searcher__toggle-checkbox" type="checkbox" />
        <span className="movies-searcher__toggle-switch"></span>
        <span>Короткометражки</span>
      </label>

    </section>
  );
};

export default MoviesSearcher;