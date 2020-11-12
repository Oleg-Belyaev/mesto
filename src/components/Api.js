const handleOriginalResponse = (res) => {
  if (res.ok) {
    return res.json();
  } return Promise.reject(`Что-то пошло не так: ${res.status}`);  
};

export default class Api {
  constructor(options) {
    this._headers = options.headers;
    this._url = options.url;
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })  
    .then(handleOriginalResponse)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })  
    .then(handleOriginalResponse)
    .then((items) => {
      return items;
    })
    .catch((err) => {
      console.log(err);
    })
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about 
      })
    })  
    .then(handleOriginalResponse)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    })
  }

  createCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link 
      })
    })  
    .then(handleOriginalResponse)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    })
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })  
    .then(handleOriginalResponse)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    })
  }

  addLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })  
    .then(handleOriginalResponse)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    })  
  }

  removeLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })  
    .then(handleOriginalResponse)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    })  
  }

  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link
      })
    })  
    .then(handleOriginalResponse)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    })
  }
}