// import { apiToken } from './utils.js'
import { getToken } from './../utils/token'

class Api {
    constructor({ baseURL, headers, method = 'GET' }) {
        this.baseURL = baseURL
        this.headers = headers
        this.method = method
    }

    getHeaders() {
      const jwt = getToken();
      return {
        ...this.headers,
        'Authorization': `Bearer ${jwt}`,
      }
    }

    getProfile(URL) {
        return fetch(`${this.baseURL}${URL}`, {
            headers: this.getHeaders()
        })
            .then(result => {
                if (result.ok) {
                    return result.json()
                } else {
                    return Promise.reject(`Что-то пошло не так: ${result.status}`);
                }
            })
    }

    getCards(URL) {
        return fetch(`${this.baseURL}${URL}`, {
            headers: this.getHeaders()
        })
            .then(result => {
                if (result.ok) {
                    return result.json()
                } else {
                    return Promise.reject(`Что-то пошло не так: ${result.status}`);
                }
            })
    }

    toggleLike(URL, method) {
        return fetch(`${this.baseURL}${URL}`, {
            method: method,
            headers: this.getHeaders()
        })
            .then(result => {
                if (result.ok) {
                    return result.json()
                } else {
                    return Promise.reject(`Что-то пошло не так: ${result.status}`);
                }
            })
    }

    addUserCard(URL, method, name, link) {
        return fetch(`${this.baseURL}${URL}`, {
            method: method,
            headers: this.getHeaders(),
            body: JSON.stringify({
                name: name,
                link: link,
            })
        })
            .then(result => {
                if (result.ok) {
                    return result.json()
                } else {
                    return Promise.reject(`Что-то пошло не так: ${result.status}`);
                }
            })
    }

    deleteCard(URL, method) {
        return fetch(`${this.baseURL}${URL}`, {
            method: method,
            headers: this.getHeaders()
        })
            .then(result => {
                if (result.ok) {
                    return result.json()
                } else {
                    return Promise.reject(`Что-то пошло не так: ${result.status}`);
                }
            })
    }

    editProfileInfo(URL, method, name, about) {
        return fetch(`${this.baseURL}${URL}`, {
            method: method,
            headers: this.getHeaders(),
            body: JSON.stringify({
                name,
                about,
            })
        })
            .then(result => {
                if (result.ok) {
                    return result.json()
                } else {
                    return Promise.reject(`Что-то пошло не так: ${result.status}`);
                }
            })
    }

    setAvatar(URL, method, avatarURL) {
        return fetch(`${this.baseURL}${URL}`, {
            method: method,
            headers: this.getHeaders(),
            body: JSON.stringify({
                avatar: avatarURL
            })
        })
            .then(result => {
                if (result.ok) {
                    return result.json()
                } else {
                    return Promise.reject(`Что-то пошло не так: ${result.status}`);
                }
            })
    }
}

export const api = new Api({
  baseURL: 'http://api.johnnyonthecloud.students.nomoredomains.monster',
  headers: {
    // authorization: apiToken,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
