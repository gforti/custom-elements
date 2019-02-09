window.customElements.define('notification-bar', class extends HTMLElement {

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(this.generateTemplate().content.cloneNode(true))
    this.banner = this.shadowRoot.querySelector('div.banner')
    this.dismiss = this.shadowRoot.querySelector('button.dismiss')
    this.message = this.shadowRoot.querySelector('div.message')
    this.closeBind = this.close.bind(this)
    this.closeTouchBind = this.closeTouch.bind(this)
    this.animationDuration = 10
  }

  generateTemplate() {
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        .warn {
          background-color: #fde073;
        }
        .error {
          background-color: #ff4846;
        }
        .success {
          background-color: #89bb67;
        }
        .primary {
          background-color: #e6e6e6;
        }
        .banner {
          align-items: center;
          box-shadow: 0 0 5px rgba(0,0,0,0.6);
          color: #fff;
          display: flex;
          height: 50px;
          justify-items: center;
          left: 0;
          overflow: hidden;
          position: fixed;
          right: 0;
          text-align: center;
          z-index: 1000;
        }
        .top {
          top: 0;
          transform: translateY(-100px);
        }
        .bottom {
          bottom: 0;
          transform: translateY(100px);
        }
        .show-top {
          animation: slideDown 10s ease forwards;
        }
        .show-bottom {
          animation: slideUp 10s ease forwards;
        }
        .message {
          flex-grow: 1;
          font-size: 1.1rem;
        }
        .dismiss {
          -moz-appearance: none;
          -webkit-appearance: none;
          background-color: rgba(10,10,10,.2);
          border: none;
          border-radius: 290486px;
          cursor: pointer;
          display: inline-block;
          height: 75%;
          outline: 0;
          pointer-events: auto;
          position: absolute;
          right: 1rem;
          top: 15%;
          width: 2.5rem;
        }
        .dismiss::after {
          color: #fff;
          content: "X";
          display: block;
          font-size: 1.2rem;
          font-weight: bold;
        }
        @keyframes slideDown {
          0%, 100% {
            transform: translateY(-100px);
          }
          10%, 90% {
            transform: translateY(0px);
          }
        }
        @keyframes slideUp {
          0%, 100% {
            transform: translateY(100px);
          }
          10%, 90% {
            transform: translateY(0px);
          }
        }
       </style>
        <div class="banner bottom primary">
          <button class="dismiss" aria-label="dismiss"></button>
          <div class="message"></div>
        </div>
    `
    return template
  }

  connectedCallback() {
    this.dismiss.addEventListener('click', this.closeBind)
    this.banner.addEventListener('animationend', this.closeBind)
    this.addEventListener('touch-swipe', this.closeTouchBind)
  }

  disconnectedCallback() {
    this.dismiss.removeEventListener('click', this.closeBind)
    this.banner.removeEventListener('animationend', this.closeBind)
    this.removeEventListener('touch-swipe', this.closeTouchBind)
  }

  static get observedAttributes() {
    return ['data-message']
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue && newValue.length) {
      this.render()
    }
  }

  render() {
    this.message.innerHTML = this.dataset.message
    this.setStatus()
    this.setPosition()
    this.animationDuration = ~~(this.dataset.duration || this.animationDuration)
    this.banner.style.animationDuration = `${this.animationDuration}s`
    this.reveal()
  }

  close() {
    this.banner.classList.remove('show-top', 'show-bottom')
  }

  closeTouch(evt) {
    if(['up', 'down', 'left', 'right'].indexOf(evt.detail) > -1) {
      this.banner.classList.remove('show-top', 'show-bottom')
    }
  }

  reveal() {
    if (this.dataset.position === 'top') {
      this.banner.classList.add('show-top')
    } else {
      this.banner.classList.add('show-bottom')
    }
  }

  setStatus() {
    let status = 'primary'
    if (this.dataset.status) {
      switch (this.dataset.status.toLowerCase()) {
      case 'warn':
      case 'error':
      case 'success':
        status = this.dataset.status.toLowerCase()
        break
      default:
        status = 'primary'
      }
    }
    this.banner.classList.remove('primary', 'warn', 'error', 'success')
    this.banner.classList.add(status)
  }

  setPosition() {
    this.banner.classList.remove('top', 'bottom')
    if (this.dataset.position === 'top') {
      this.banner.classList.add('top')
    } else {
      this.banner.classList.add('bottom')
    }
  }

})
