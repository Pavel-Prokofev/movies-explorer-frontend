import { useLocation } from 'react-router-dom';

import './MoviesSearcher.css';

function MoviesSearcher(props) {

  const location = useLocation();

  const handleCheckedValue = () => {
    if (props.searchValue.inputValid && !props.loadingErrorText) {
      props.setCheckedValue(!props.checkedValue);
      const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
      if (location.pathname === "/movies") {
        lastSearch.lastCheckedValue = !props.checkedValue;
      } else if (location.pathname === '/saved-movies' && props.likedMoviesArr.length !== 0) {
        lastSearch.lastLikedCheckedValue = !props.checkedValue;
      }
      localStorage.setItem('lastSearch', JSON.stringify(lastSearch));
      handleSubmit();
    } else { props.searchValue.onInput() }
  };

  const handleSubmit = (evt) => {
    if (evt) { evt.preventDefault(); };
    if (props.loadingErrorText) { window.location.reload(); }
    if (props.searchValue.inputValid && !props.loadingErrorText) {
      const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
      if (location.pathname === "/movies") {
        lastSearch.lastSearchValue = props.searchValue.value;
      } else if (location.pathname === '/saved-movies' && props.likedMoviesArr.length !== 0) {
        lastSearch.lastLikedSearchValue = props.searchValue.value;
      }
      localStorage.setItem('lastSearch', JSON.stringify(lastSearch));
      if (props.allMoviesArr.length === 0 && location.pathname === "/movies") {
        props.handleResetMore();
        props.handleGetAllMoviesArr();
      } else {
        props.handleResetMore();
        props.setActualSearch(JSON.parse(localStorage.getItem('lastSearch')));
      };
    };
  }

  return (
    <section className="movies-searcher" aria-label="Поисковик фильмов">
      <form name="movies-searcher" className="movies-searcher__form" noValidate onSubmit={handleSubmit}>
        <input type="search" name="desired-movie" id="movies-input" className="movies-searcher__input" placeholder="Фильм"
          value={props.searchValue.value} onChange={props.searchValue.handleChangeValue} onFocus={props.searchValue.onInput} />
        <button type="submit" className="movies-searcher__submit-button"></button>
      </form>
      <span className="movies-searcher__error">{props.searchValue.isDirty ? props.searchValue.errorText : ''}</span>
      <div className={`movies-searcher__toggle ${!props.searchValue.inputValid || props.loadingErrorText || (location.pathname === '/saved-movies' && props.likedMoviesArr.length === 0) ? 'movies-searcher__toggle_disabled' : ''}`}>
        <label>
          <input className="movies-searcher__toggle-checkbox" type="checkbox" checked={props.checkedValue} onChange={handleCheckedValue} />
          <span className={`movies-searcher__toggle-switch ${!props.searchValue.inputValid || props.loadingErrorText || (location.pathname === '/saved-movies' && props.likedMoviesArr.length === 0) ? 'movies-searcher__toggle-switch_disabled' : ''}`}></span>
        </label>
        <span>Короткометражки</span>
      </div>
    </section>
  );
};

export default MoviesSearcher;