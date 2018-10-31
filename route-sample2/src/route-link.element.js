window.customElements.define('route-link', class extends HTMLElement {

  constructor() {
    super()
    this.activateRouteBind = this.activateRoute.bind(this)
    this._basePath = `${window.location.origin}/`
  }

  static get observedAttributes() {
    return ['data-title']
  }

  connectedCallback() {
    this.addEventListener('click', this.activateRouteBind)

  }

  disconnectedCallback() {
    this.removeEventListener('click', this.activateRouteBind)
  }

  activateRoute() {
    document.title = this.dataset.title
    window.history.pushState(this.dataset.route, this.dataset.title, `${this._basePath}${this.dataset.route}`)
    window.dispatchEvent(new CustomEvent('route-clicked', { detail: this.dataset.route }))
  }

})
