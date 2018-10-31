window.customElements.define('row-sort', class extends HTMLElement {

  constructor() {
    super()
  }

  connectedCallback() {
    if (!this.classList.contains('connected'))
      this.classList.add('row-sort-new-animate')

  }

  disconnectedCallback() {
    this.classList.remove('row-sort-new-animate')
    this.classList.add('row-sort-animate', 'connected')
  }

  static get observedAttributes() {
    return ['data-required-position']
  }

})
