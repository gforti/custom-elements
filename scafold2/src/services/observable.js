export default class Observable {

  constructor() {
    this.observers = new Map()
    this.errors = new Map()
    this.completes = new Map()
  }

  subscribe(f) {
    let complete, error, next = f
    if (typeof f !== 'function') {
      ({ next, error, complete } = f)
    }
    const uid = this._hashCode(next.toString())
    this.observers.set(uid, next)
    if (error) {
      this.errors.set(uid, error)
    }
    if (complete) {
      this.completes.set(uid, complete)
    }
    return { unsubscribe: this.unsubscribe.bind(this, uid) }
  }

  unsubscribe(uid) {
    this.observers.delete(uid)
    this.errors.delete(uid)
  }

  complete() {
    this.completes.forEach(observer => observer())
    this.observers = new Map()
    this.errors = new Map()
    this.completes = new Map()
  }

  notify(msg) {
    this.observers.forEach(observer => observer(msg))
  }

  notifyError(msg) {
    this.errors.forEach(observer => observer(msg))
  }

  _hashCode(str = '') {
    let hash = 0, i = 0, len = str.length
    if (str.length === 0) {
      return hash
    }
    while (i < len) {
      hash = ((hash << 5) - hash + str.charCodeAt(i++)) << 0
    }
    return hash
  }
}
