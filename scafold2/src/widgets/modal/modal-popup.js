window.customElements.define('modal-popup', class extends HTMLElement {

  generateTemplate() {

    const template = document.createElement('template')

    template.innerHTML = `
      <style>
        .modal {
          align-items: center;
          bottom:0;
          display: none;
          flex-direction: column;
          justify-content: center;
          left: 0;
          margin: auto;
          max-height: 50vh;
          max-width: 54vw;
          overflow: hidden;
          position: fixed;
          right:0;
          top: 0;
          z-index: 40;
        }
        .side {
          flex-direction: initial;
          max-height: 100vh;
          height: 100%;
          margin: 0;
          right: 0;
          width: 54vw;
        }
        .bg-is-active {
          max-height: 100vh;
          max-width: 100vw;
          width: 100vw;
        }
        .left {
          justify-content: flex-start;
        }
        .right {
          justify-content: flex-end;
          left: initial;
          right:0;
        }
        .popup {
          background: #fff;
          border-radius: 3px;
          box-shadow: 0px 0px 20px rgba(0,0,0,0.3);
          max-height: 50vh;
          max-width: 50vw;
          min-height: 100px;
          min-width: 300px;
          overflow: auto;
          position: fixed;
          z-index: 2;
        }
        .popup-side {
          height: 100vh;
          max-height: 100vh;
          width: 50vw;
        }
        .is-active {
          display: flex;
        }
        .background {
          background-color: rgba(10,10,10,.50);
          left: 0;
          position: absolute;
          top: 0;
        }
        .bg-is-active .background {
          max-height: 100vh;
          bottom: 0;
          right: 0;
        }
        .content {
          box-sizing: border-box;
          height: 100%;
          width: 100%;
        }
        .slide .content {
          height: 100vh;
        }
        .close {
          background-color: #fff;
          color: #555;
          cursor: pointer;
          font: 500 2.2rem sans-serif;
          outline: none;
          position: absolute;
          right: 2.4rem;
          top: 1rem;
        }
        .close-wrapper {
          position: sticky;
          position: -webkit-sticky;
          top: 0;
        }
        .hide-content {
          display: none;
        }

        @media screen and (max-width: 800px) {
          .modal {
            max-height: 75vh;
            max-width: 79vw;
          }
          .side {
            max-height: 100vh;
            width: 79vw;
          }
          .bg-is-active {
            max-height: 100vh;
            max-width: 100vw;
            width: 100vw;
          }
          .popup {
            max-height: 75vh;
            max-width: 75vw;
            min-height: 100px;
            min-width: 300px;
          }
          .popup-side {
            max-height: 100vh;
            width: 75vw;
          }
        }
      </style>
      <div class="modal">
        <div class="background"></div>
        <div class="popup">
          <div class="close-wrapper">
            <div class="close" aria-label="close">&#215;</div>
          </div>
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </div>
    `
    return template
  }

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(this.generateTemplate().content.cloneNode(true))
    this.btnClose = this.shadowRoot.querySelector('div.close')
    this.modal = this.shadowRoot.querySelector('div.modal')
    this.modalPopup = this.shadowRoot.querySelector('div.popup')
    this.modalBG = this.shadowRoot.querySelector('div.background')
    this.modalBlur = document.querySelector('modal-blur')
    this.closePopupBind = this.closePopup.bind(this)
  }

  connectedCallback() {
    this.btnClose.addEventListener('click', this.closePopupBind)
    this.modalBG.addEventListener('click', this.closePopupBind)
    this.render()
  }

  static get observedAttributes() {
    return ['data-show', 'data-allow-close', 'data-position', 'data-allow-screen-click']
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render()
    }
  }

  disconnectedCallback() {
    this.btnClose.removeEventListener('click', this.closePopupBind)
    this.modalBG.removeEventListener('click', this.closePopupBind)
  }

  render() {
    let allowClose = true
    let showModal = false
    let position = 'center'
    let hideBG = false

    if (this.dataset.show && this.dataset.show.toLowerCase() === 'true') {
      showModal = true
    }
    if (this.dataset.allowClose && this.dataset.allowClose.toLowerCase() === 'false') {
      allowClose = false
    }
    if (this.dataset.allowScreenClick && this.dataset.allowScreenClick.toLowerCase() === 'true') {
      hideBG = true
    }
    if (this.dataset.position) {
      position = this.dataset.position.toLowerCase()
    }

    if (this.modalBlur) {
      this.modalBlur.dataset.blur = 'false'
    }
    // reset Modal
    this.modal.classList.remove('is-active', 'side', 'right', 'left')
    this.modal.classList.add('bg-is-active')
    this.modalPopup.classList.remove('popup-side')
    this.btnClose.classList.remove('hide-content')

    if (showModal) {
      this.modal.classList.add('is-active')
      if (this.modalBlur) {
        this.modalBlur.dataset.blur = 'true'
      }
    }

    if (!allowClose) {
      this.btnClose.classList.add('hide-content')
    }

    if (hideBG) {
      this.modalBlur.dataset.blur = 'false'
      this.modal.classList.remove('bg-is-active')
    }

    if (position && ['right', 'left'].indexOf(position) > -1) {
      this.modal.classList.add('side', position)
      this.modalPopup.classList.add('popup-side')
    }

  }

  closePopup() {
    let allowClose = true
    if (this.dataset.allowClose && this.dataset.allowClose.toLowerCase() === 'false') {
      allowClose = false
    }
    if (allowClose) {
      this.dataset.show = false
    }
    this.dispatchEvent(new CustomEvent('popup-closed'))
  }

})
