window.customElements.define('status-display', class extends HTMLElement {

  constructor() {
    super()
  }

  generateTemplate() {
    const slot = this.innerText
    return `
      <blockquote>
        <big>
          <span></span>
          ${slot}
        </big>
      </blockquote>
    `
  }

  connectedCallback() {
    this.innerHTML = this.generateTemplate()
    this.contentStatus = this.querySelector('span')
  }

  static get observedAttributes() {
    return ['data-status']
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.contentStatus.innerText = newValue
    }
  }

})
