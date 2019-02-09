class RouterService {

  constructor() {

    if(this.instance) {
      return this.instance
    }
    this.instance = this
    this._paths = new Map()
    this._basePath = window.location.origin
    this._exitFn = null
    this.paramRegex = /[:*](\w+)/g
    this.lastRoutePath = window.sessionStorage.getItem('last-route-path') || ''
    this.historyChangeBind = this.historyChange.bind(this)
    window.addEventListener('url-change', this.historyChangeBind)
    window.addEventListener('popstate', this.historyChangeBind)
    this.routeDisplay = document.querySelector('route-display')

    const path = this.getCurrentPath()
    window.addEventListener('load', this.goto.bind(this, path))
  }

  getCurrentPath() {
    return decodeURI(window.location.pathname)
  }

  getRoute() {
    let currentPath = this.getAdjustedPath(this.getCurrentPath())
    return [...this._paths.keys()]
      .map(this.fromBase64.bind(this))
      .find(routeRE => this._pathToRegex(routeRE).test(currentPath))
  }

  getAdjustedPath(path) {
    return path.split('/')
      .filter(pathName => pathName.length)
      .join('/')
  }

  historyChange() {
    if(this.lastRoutePath === this.getCurrentPath()) {
      return
    }
    if (typeof this._exitFn === 'function') {
      this._exitFn()
    }
    this._exitFn = null
    if(this.lastRoutePath !== this.getCurrentPath()) {
      window.sessionStorage.setItem('last-route-path', this.lastRoutePath)
    }
    this.lastRoutePath = this.getCurrentPath()
    const route = this.getRoute()
    let handlers = this.getPath(route) || this.getPath('/')
    let req = {
      exit: this._exit.bind(this),
      load: this._load.bind(this),
      params: this._pathParams(route),
      search: new URLSearchParams(window.location.search)
    }
    const pipeNext = callbacks => {
      if (Array.isArray(callbacks) && callbacks.length) {
        const next = callbacks.shift()
        if(typeof next === 'function') {
          next(req, pipeNext.bind(this, callbacks))
        }
      }
    }
    if (handlers) {
      pipeNext(handlers.slice())
    }
  }

  get basePath() {
    return this._basePath
  }

  goto(path, title='') {
    window.history.pushState(path, title, `${this.basePath}${path}`)
    window.dispatchEvent(new CustomEvent('url-change', { detail: path }))
    return this
  }

  toBase64(str) {
    return window.btoa(unescape(encodeURIComponent(str)))
  }

  fromBase64(str) {
    return decodeURIComponent(escape(window.atob(str)))
  }

  setPath(path, ...callbacks) {
    path = this.getAdjustedPath(path)
    if (path.length) {
      this._paths.set(this.toBase64(path), callbacks)
    }
    return this
  }

  defaultPath(...callbacks) {
    this._paths.set(this.toBase64('/'), callbacks)
    return this
  }

  getPath(path) {
    return this._paths.get(this.toBase64(path))
  }

  _load(content) {
    if (document.body.contains(this.routeDisplay)) {
      this.routeDisplay.insertContent(content)
    }
    return this
  }

  _exit(fn) {
    this._exitFn = fn
  }

  _pathToRegex(path = '') {
    let pattern = path.split('/')
      .filter(pathName => pathName.length)
      .map(pathName => this.paramRegex.test(pathName) ? `(\\w+)${pathName.includes('?') ? '?' : ''}` : pathName)
      .join('/?')
    return new RegExp(`^/?${pattern || '/'}/?$`)
  }

  _pathParams(path = '') {
    let matches = path.match(this.paramRegex)
    const currentPath = this.getAdjustedPath(this.getCurrentPath())
    const routeParams = currentPath.match(this._pathToRegex(path))
    let params = new Map()
    if (matches && routeParams) {
      routeParams.shift()
      matches.map(param => param.replace(':','')).forEach((param, i) => {
        params.set(param, routeParams[i])
      })
    }
    return params
  }
}

export default new RouterService()
