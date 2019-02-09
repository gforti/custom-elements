window.customElements.define('detail-card', class extends HTMLElement {

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(this.generateTemplate().content.cloneNode(true))
    this.header = this.shadowRoot.querySelector('div.header')
    this.caption = this.shadowRoot.querySelector('div.caption')
  }

  generateTemplate() {

    const template = document.createElement('template')

    template.innerHTML = `
      <style>
        .card {
          display: inline-block;
          text-align: center;
        }
        .header {
          color: #1b3e80;
          font-size: large;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        .caption {
          color: #768bb3;
          font-size: small;
        }
      </style>
      <div class="card">
        <div class="header"></div>
        <div class="caption"></div>
      </div>
    `
    return template
  }

  connectedCallback() {
    this.render()
  }

  static get observedAttributes() {
    return ['data-header', 'data-caption']
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render()
    }
  }

  render() {
    this.header.innerHTML = this.dataset.header
    this.caption.innerHTML = this.dataset.caption
  }

})
