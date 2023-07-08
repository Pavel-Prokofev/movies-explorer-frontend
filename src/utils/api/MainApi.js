
const configApi = {
  url: 'http://localhost:3003',
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

  // patchUserAvatar({ avatar },) {
  //   return fetch(`${this._url}/users/me/avatar`, {
  //     method: 'PATCH',
  //     headers: {
  //       'authorization': `Bearer ${localStorage.getItem('jwt')}`,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       avatar: avatar
  //     })
  //   })
  //     .then((res) => this._checkResponse(res))
  // };

  // getAllCards() {
  //   return fetch(`${this._url}/cards`, {
  //     headers: {
  //       'authorization': `Bearer ${localStorage.getItem('jwt')}`,
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then((res) => this._checkResponse(res))
  // };

  // postNewCard({ name, link }) {
  //   return fetch(`${this._url}/cards`, {
  //     method: 'POST',
  //     headers: {
  //       'authorization': `Bearer ${localStorage.getItem('jwt')}`,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       name: name,
  //       link: link
  //     })
  //   })
  //     .then((res) => this._checkResponse(res))
  // };

  // putCardLike(cardId) {
  //   return fetch(`${this._url}/cards/${cardId}/likes`, {
  //     method: 'PUT',
  //    headers: {
  //     'authorization': `Bearer ${localStorage.getItem('jwt')}`,
  //     'Content-Type': 'application/json'
  //   }
  //   })
  //     .then((res) => this._checkResponse(res))
  // };

  // delCardLike(cardId) {
  //   return fetch(`${this._url}/cards/${cardId}/likes`, {
  //     method: 'DELETE',
  //     headers: {
  //       'authorization': `Bearer ${localStorage.getItem('jwt')}`,
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then((res) => this._checkResponse(res))
  // };

  // delCard(cardId) {
  //   return fetch(`${this._url}/cards/${cardId}`, {
  //     method: 'DELETE',
  //    headers: {
  //     'authorization': `Bearer ${localStorage.getItem('jwt')}`,
  //     'Content-Type': 'application/json'
  //   }
  //   })
  //     .then((res) => this._checkResponse(res))
  // };

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

  // checkJwt() {
  //   return fetch(`${this._url}/users/me`, {
  //     method: 'GET',
  //     headers: {
  //       'authorization': `Bearer ${localStorage.getItem('jwt')}`,
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then((res) => this._checkResponse(res))
  // };

}

const mainApi = new MainApi(configApi);

export default mainApi;