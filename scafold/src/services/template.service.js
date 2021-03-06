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
  }

  announcePayload() {
    this.notify(this._payload)
  }

  getList() {
    new HttpFetch().get(EndPoints.TEST).subscribe({
      error: this.notifyError.bind(this),
      next: (payload) => {
        this._payload = payload
        this.announcePayload()
      },
    })
  }

}

export default new TemplateService()
