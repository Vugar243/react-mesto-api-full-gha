class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(this._checkResponse)
  }
  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse)
  }
  updateUserInfo({ name, about }) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._checkResponse)
  }
  addCard({ name, link }) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._checkResponse)
  }
  updateAvatar({ avatar }) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar,
      })
    })
      .then(this._checkResponse)
  }
  deleteCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`
      },
    })
      .then(this._checkResponse)
  }
  likeCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/cards/${cardId}/likes/`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`
      },
    })
      .then(this._checkResponse)
  }

  dislikeCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/cards/${cardId}/likes/`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`
      },
    })
      .then(this._checkResponse)
  }
}
const api = new Api({
  baseUrl: 'https://api.vugar1.nomoredomainsmonster.ru'
});
export default api;

  // другие методы работы с API

//Высылаю данные для 9-й проектной работы:


//Токен: 4549333d-9f3f-4884-90e6-025358e71c4d
//Идентификатор группы: cohort-74
