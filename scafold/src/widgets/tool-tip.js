window.customElements.define('tool-tip', class extends HTMLElement {

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
      .appendChild(this.generateTemplate().content.cloneNode(true))
    this._tooltiptext = this.shadowRoot.querySelector('span.popup')
  }

  generateTemplate() {
    const template = document.createElement('template')
    template.innerHTML = `
      <style>

span.popup::after {
  content: attr(data-popuptext);
  background: rgba(0, 0, 0, 0.85);
  border-radius: 3px;
  opacity: 0;
  position: absolute;
  transition: 500ms ease;
  white-space: nowrap;
  padding: .0em;

  z-index: 1000;
}
span.popup:hover::after {
  opacity: 1;
}
       </style>

        <span class="popup"><slot></slot></span>
    `
    return template
  }

  connectedCallback() {
    this._slotElement = this.firstElementChild
    this._adjustToolTipLocation()
  }

  static get observedAttributes() {
    return ['data-message']
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue && newValue.length) {
      this._tooltiptext.dataset.popuptext = newValue
      this._adjustToolTipLocation()
    }
  }

  _adjustToolTipLocation() {
    if (this._slotElement) {
      console.log(this._slotElement.getBoundingClientRect())
      const { top, right, height } = this._slotElement.getBoundingClientRect()
      Array.from(this.shadowRoot.styleSheets[0].cssRules).forEach(rule => {
        if (rule.selectorText === 'span.popup::after') {
          rule.style.top = `${top}px`
          rule.style.left = `${right + 10}px`
        }
      })
    }
  }

})


