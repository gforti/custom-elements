
window.customElements.define('content-loader', class extends HTMLElement {

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(this.generateTemplate().content.cloneNode(true))
    this.loader = this.shadowRoot.querySelector('div.loader')
  }

  generateTemplate() {

    const template = document.createElement('template')

    template.innerHTML = `
      <style>
        .content {
          background-color: var(--background, transparent);
          box-shadow: 0 1px 1px 0 rgba(0,0,0,0.1);
          color: var(--on-background, initial);
          display: inline-flex;
          flex-direction: column;
          margin: 0;
          padding: 1rem;
          position: relative;
          transition: 0.3s;
        }
        .content:hover {
          box-shadow: 0 2px 2px 0 rgba(0,0,0,0.2);
        }
        .loader {
          align-items: center;
          background-color: var(--background, #eee);
          display: inline-flex;
          height: 100%;
          justify-content: center;
          left: 0;
          position: absolute;
          top: 0;
          visibility: hidden;
          width: 100%;
          z-index: 9999;
        }
        .dual-ring {
          animation: dual-ring 1.2s linear infinite;
          content: " ";
          display: block;
          border: 5px solid var(--on-background, #000);
          border-left-color: transparent;
          border-radius: 50%;
          border-right-color: transparent;
          height: 46px;
          margin: 1px;
          transition: transform .2s ease-out;
          width: 46px;
        }
        @keyframes dual-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .dual-ring:hover {
          transform: scale(1.2);
        }
        .loader.is-active {
          visibility: visible;
        }
       </style>
        <div class="content">
            <div class="loader">
                <div class="dual-ring"></div>
              </div>
            <slot></slot>
        </div>
    `
    return template
  }

  connectedCallback() {
    this.render()
  }

  static get observedAttributes() {
    return ['data-loading']
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render()
    }
  }

  render() {
    if (this.dataset.loading.toLowerCase() === 'true')
      this.loader.classList.add('is-active')
    else
      this.loader.classList.remove('is-active')
  }

})
