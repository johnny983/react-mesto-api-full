import { apiToken } from './utils.js'
import { getToken } from './../utils/token'

class ApiAuth {
    constructor({ baseURL, headers, method = 'GET' }) {
        this.baseURL = baseURL
        this.headers = headers
        this.method = method
    }

    getHeaders() {
      const token = getToken();
      return {
        ...this.headers,
        'Authorization': `Bearer ${token}`,
      }
    }

    auth(URL, method, userData) {
        return fetch(`${this.baseURL}${URL}`, {
            method: method,
            headers: this.getHeaders(),
            body: JSON.stringify(userData)
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return res.json().then(data => Promise.reject(data.error || data.message))
                }
            })
    }

    getData(URL) {
        return fetch(`${this.baseURL}${URL}`, {
            headers: this.getHeaders(),
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
  baseURL: 'http://api.johnnyonthecloud.students.nomoredomains.monster',
  headers: {
    authorization: apiToken,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})
