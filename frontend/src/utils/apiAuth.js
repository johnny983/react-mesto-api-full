import { apiToken } from './utils.js'

class ApiAuth {
    constructor({ baseURL, headers, method = 'GET' }) {
        this.baseURL = baseURL
        this.headers = headers
        this.method = method
    }

    auth(URL, method, userData) {
        return fetch(`${this.baseURL}${URL}`, {
            method: method,
            headers: this.headers,
            body: JSON.stringify(userData)
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return res.json().then(data => Promise.reject(data.error || `Что-то пошло не так: ${res.status}`))
                }
            })
    }

    getData(URL, token) {
        return fetch(`${this.baseURL}${URL}`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return res.json().then(data => Promise.reject(data.error || `Что-то пошло не так: ${res.status}`))
                }
            })
    }
}

export const apiAuth = new ApiAuth({
  baseURL: 'https://auth.nomoreparties.co',
  headers: {
    authorization: apiToken,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})
