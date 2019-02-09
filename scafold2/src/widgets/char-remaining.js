window.customElements.define('char-remaining', class extends HTMLElement {

  constructor() {
    super()
    this.updateCharBind = this.updateChar.bind(this)
  }

  generateTemplate() {
    const slot = this.innerHTML
    return `
      <div>
        ${slot}
        <span></span>
      </div>
    `
  }

  insertStyle() {
    const style = `
    <style type="text/css" id="char-remaining">
      char-remaining div {
        border: 1px solid #bcbcbc;
        border-radius: 2px;
        display: flex;
        justify-content: space-between;
      }

      char-remaining span {
        align-self: center;
        color: #232323;
        font-size: 0.65rem;
        font-weight: 200;
        padding-right: 0.5rem;
        white-space: nowrap;
      }

      char-remaining textarea + span {
        align-self: flex-end;
        padding-bottom: 0.8rem;
      }

      char-remaining input,
      char-remaining textarea {
        border: 0;
        font-size: 0.9rem;
        outline: 0;
        padding: 0.8rem;
        width: 100%;
      }

      char-remaining textarea {
        height: 6.8rem;
        resize: none;
      }
    </style>`
    const elem = document.head || this.parentElement || this
    if (!elem.querySelector('#char-remaining')) {
      elem.insertAdjacentHTML('afterbegin', style)
    }
  }

  connectedCallback() {
    this.insertStyle()
    this.innerHTML = this.generateTemplate()
    this.userInput = this.querySelector('textarea') || this.querySelector('input')
    this.span = this.querySelector('span')
    if (this.userInput && this.userInput.maxLength > 0) {
      this.dataset.caption = this.dataset.caption || 'chars max'
      this.updateChar()
      this.userInput.addEventListener('input', this.updateCharBind)
    }
  }

  disconnectedCallback() {
    if (this.userInput) {
      this.userInput.removeEventListener('input', this.updateCharBind)
    }
  }

  updateChar() {
    const maxLen = this.userInput.maxLength
    this.span.textContent = `${maxLen - this.userInput.value.length} ${this.dataset.caption}`
  }

})
