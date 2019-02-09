window.customElements.define('modal-blur', class extends HTMLElement {

  generateTemplate() {

    const template = document.createElement('template')

    template.innerHTML = `
      <style>
        .cover {
          transition: 0.1s all ease;
        }
        .blur {
          filter: blur(3px);
          transform: scale(0.99);
        }
      </style>
      <div class="cover blur">
          <slot></slot>
      </div>
    `
    return template
  }

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(this.generateTemplate().content.cloneNode(true))
    this.modalCover = this.shadowRoot.querySelector('div.cover')
  }

  connectedCallback() {
    this.render()
  }

  static get observedAttributes() {
    return ['data-blur']
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render()
    }
  }

  render() {
    if (this.dataset.blur && this.dataset.blur.toLowerCase() === 'true') {
      this.modalCover.classList.add('blur')
    } else {
      this.modalCover.classList.remove('blur')
    }
  }

})
