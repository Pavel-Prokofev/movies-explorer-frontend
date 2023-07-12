const moviesApi = {
  getAllMovies: () => {
    return fetch(`https://api.nomoreparties.co/beatfilm-movies`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
  }
}

export default moviesApi;