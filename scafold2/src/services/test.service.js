import { EndPoints } from './endpoints.js'
import HttpFetch from './http-fetch.js'
import Observable from './observable.js'
import { formatDate } from './util.js'

class TestService extends Observable {

  constructor() {
    super()
    if (this.instance) {
      return this.instance
    }
    this.instance = this
    this._payload
    this._mutatedPayload
  }

  announcePayload() {
    this.notify(this._mutatedPayload)
  }

  resetPayload() {
    this._payload = null
    return this
  }

  _isNewPayload(payload) {
    return !!(JSON.stringify(payload) !== JSON.stringify(this._payload))
  }

  save(apiData, success) {
    new HttpFetch().post(EndPoints.TEST, apiData).subscribe({
      error: this.notifyError.bind(this),
      next: success
    })
  }

  getList() {
    new HttpFetch().get(EndPoints.TEST).subscribe({
      error: this.notifyError.bind(this),
      next: payload => {
        if (this._isNewPayload(payload)) {
          this._payload = payload
          this._mutatedPayload = this._modelPayload(payload)
          this.announcePayload()
        }
      },
    })
  }

  _modelPayload(payload) {
    let model = []
    model = Array.from(payload).map((source, index) => this._modelSource(source, index))
    return model
  }

  _modelSource(source, index = 0) {
    return {
      email: source.hasOwnProperty('email') ? source.email.toString() : '',
      id: source.hasOwnProperty('_id') ? source._id.toString() : '',
      index: index + 1,
      registered: source.hasOwnProperty('registered') ? formatDate(source.registered) : '',
      username: source.hasOwnProperty('username') ? source.username.toString() : '',
    }
  }

  get HEADERS_LIST() {
    return [
      { id: 'index', label: 'Row #'},
      { id: 'username', label: 'User Name' },
      { id: 'email', label: 'E-Mail' },
      { id: 'registered', label: 'Registered' },
    ]
  }

  _formatDateAndTime(date) {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      month: '2-digit',
      year: 'numeric',
    }).replace(/,/g, '')
  }

  evaluateRequestError(response) {
    let reason = ''
    if (response instanceof Error) {
      reason = 'Could not connect to the server.'
    }
    if (response instanceof Response) {
      if (response.status === 400) {
        reason = 'Validation Error.'
      }
      if (response.status === 404) {
        reason = 'Server is not available.'
      }
      if (response.status === 500) {
        reason = 'Server is experiencing issues.'
      }
    }
    if (!window.navigator.onLine) {
      reason = 'It appears you are currently offline.'
    }
    return reason
  }

}

export default new TestService()
