/*
 * <script src="password-reveal.element.js" defer></script>
 * <password-reveal></password-reveal>
 */
function generateTemplate() {

    const template = document.createElement('template');

    template.innerHTML = `
        <a><slot><slot></a>
    `;
    return template;
}

class RouteLink extends HTMLElement {

    constructor() {
      super()
      const shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.appendChild(generateTemplate().content.cloneNode(true))
      this.link = this.shadowRoot.querySelector('a')
    }

    connectedCallback() {
        this.link.addEventListener('click', this.activateRoute.bind(this))
        this.render()
    }
    
    activateRoute(e) {
        this.dispatchEvent(new CustomEvent('route-clicked', { detail: this.page }))        
        e.preventDefault()        
    }
    
    disconnectedCallback() {
        this.link.removeEventListener('click', this.activateRoute.bind(this))
    }

   static get observedAttributes() {
      return ['data-page'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            this.render()
        }
    }

    render() {
        this.link.href = this.page
    }
    
    get page() {
      return this.dataset.page;
    }
    set page(value) {
      this.dataset.page = value;
    }

}

  window.customElements.define('route-link', RouteLink);
