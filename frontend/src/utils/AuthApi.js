class AuthApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register({ email, password }) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  login({ email, password }) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  checkToken(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}
const authApi = new AuthApi({
  baseUrl: 'https://api.vugar1.nomoredomainsmonster.ru',
  headers: {
    'Content-Type': 'application/json',
  },
});
export default authApi;
