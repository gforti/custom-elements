import { EndPoints } from './endpoints.js'
import HttpFetch from './http-fetch.js'
import Observable from './observable.js'

class TemplateService extends Observable {

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
    model = Array.from(payload)
    return model
  }

}

export default new TemplateService()
