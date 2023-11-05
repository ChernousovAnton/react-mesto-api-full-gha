import { apiOptions } from "./constants";
import { getToken } from "./token";

export class Api {

  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._methodsBodyRequired = options.methodsBodyRequired;
  }

  async _apiRequest(url, method, body) {
    this._headers.authorization = `Bearer ${getToken()}`
    const requestOptions = {
      method: method,
      headers: this._headers
    }
    if (this._methodsBodyRequired.includes(method)) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestOptions);
    if (!response.ok) return Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);
    const json = await response.json();
    return json;
  }

  register({email, password}) {
    const body = {email, password};
    return this._apiRequest(`${this._baseUrl}/signup`, 'POST', body);
  }

  authorise({email, password}) {
    const body = {email, password};
    return this._apiRequest(`${this._baseUrl}/signin`, 'POST', body);
  }

  getInitialCards() {
    return this._apiRequest(`${this._baseUrl}/cards`, 'GET');
  }

  getUserInfo() {
    return this._apiRequest(`${this._baseUrl}/users/me`, 'GET');
  }

  setUserInfo(data) {
    const body = {
      name: data.name,
      about: data.about
    };
    return this._apiRequest(`${this._baseUrl}/users/me`, 'PATCH', body);
  }

  createCard(data) {
    const body = {
      name: data.name,
      link: data.link
    };
    return this._apiRequest(`${this._baseUrl}/cards`, 'POST', body);
  }

  deleteCard(cardId) {
    return this._apiRequest(`${this._baseUrl}/cards/${cardId}`, 'DELETE');
  }

  changeLikeCardStatus(cardId, newLikeStatus) {
    const url = `${this._baseUrl}/cards/${cardId}/likes`;
    if (newLikeStatus) return this._apiRequest(url, 'PUT');
    return this._apiRequest(url, 'DELETE');
  }

  setUserAvatar(link) {
    const body = {avatar: link};
    return this._apiRequest(`${this._baseUrl}/users/me/avatar`, 'PATCH', body);
  }
}

const api = new Api(apiOptions);

export default api;
