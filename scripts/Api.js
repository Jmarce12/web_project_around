export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getUserData() {
    return fetch(`${this.baseUrl}users/me`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => this._checkResponse(res));
  }

  setUserData(data) {
    return fetch(`${this.baseUrl}users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.nombre,
        about: data.profesion,
      }),
    }).then((res) => this._checkResponse(res));
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}cards`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => this._checkResponse(res));
  }

  addNewCard(data) {
    return fetch(`${this.baseUrl}cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.titulo,
        link: data.enlace,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => this._checkResponse(res));
  }

  cardLike(cardId, isLiked) {
    return fetch(`${this.baseUrl}cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this.headers,
    }).then((res) => this._checkResponse(res));
  }

  _checkResponse(res) {
    if (res.ok) {
      console.log(res);
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}
