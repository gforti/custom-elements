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
    this._http = new HttpFetch()
    this._payload
  }

  announcePayload() {
    this.notify(this._payload)
  }

  getList() {
    this._http.get(EndPoints.TEST).subscribe(payload => {
      this._payload = payload
      this.announcePayload()
    })
  }

}

export default new TemplateService()
