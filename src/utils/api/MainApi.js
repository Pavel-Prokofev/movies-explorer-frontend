
const configApi = {
  url: 'https://api.moviesearcher.kirga.nomoredomains.rocks',
};

class MainApi {
  constructor({ url }) {
    this._url = url;
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  };

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => this._checkResponse(res))
  };

  patchUserInfo({ name, email }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email
      })
    })
      .then((res) => this._checkResponse(res))
  };

  getAllLikedMovies() {
    return fetch(`${this._url}/movies`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => this._checkResponse(res))
  };

  postNewMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    })
      .then((res) => this._checkResponse(res))
  };

  delMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => this._checkResponse(res))
  };

  userRegistration({ name, email, password }) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
      .then((res) => this._checkResponse(res))
  };

  userAuthenticate({ email, password }) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
      .then((res) => this._checkResponse(res))
  };
}

const mainApi = new MainApi(configApi);

export default mainApi;