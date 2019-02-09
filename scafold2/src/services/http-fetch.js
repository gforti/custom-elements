import Observable from './observable.js'
export default class HttpFetch extends Observable {

  constructor() {
    super()
  }

  _httpFetch(url, body, verb) {
    let myHeaders = new Headers()
    myHeaders.set('Content-Type', 'application/json')
    let myInit = { cache: 'default', headers: myHeaders, method: verb, mode: 'cors' }
    if (body) {
      myInit.body = JSON.stringify(body)
    }
    const myRequest = new Request(url, myInit)
    return fetch(myRequest)
      .then(response => {
        if (!response.ok) {
          this.notifyError(response)
        } else {
          return response.json()
        }
      })
      .then(json => this.notify(json))
      .catch(error => this.notifyError(error))
  }

  generateUrlParams(params = {}) {
    return `?${Object.keys(params).map(k => [k, params[k]].map(window.encodeURIComponent).join('=')).join('&')}`
  }

  get(url, params = null) {
    if (params) {
      url += this.generateUrlParams(params)
    }
    return {
      subscribe: f => {
        const unsubscribe = this.subscribe.call(this, f)
        this._httpFetch(url, null, 'GET')
        return unsubscribe
      }
    }
  }

  post(url, body) {
    return {
      subscribe: f => {
        const unsubscribe = this.subscribe.call(this, f)
        this._httpFetch(url, body, 'POST')
        return unsubscribe
      }
    }
  }

  put(url, body) {
    return {
      subscribe: f => {
        const unsubscribe = this.subscribe.call(this, f)
        this._httpFetch(url, body, 'PUT')
        return unsubscribe
      }
    }
  }

  delete(url) {
    return {
      subscribe: f => {
        const unsubscribe = this.subscribe.call(this, f)
        this._httpFetch(url, null, 'DELETE')
        return unsubscribe
      }
    }
  }

}
