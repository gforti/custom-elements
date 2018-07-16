(async () => {

    function generateTemplate() {

        const template = document.createElement('template');

        template.innerHTML = `
            <a><slot><slot></a>
        `;
        return template;
    }

  class RouteLink extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(generateTemplate().content.cloneNode(true));
      this.link = this.shadowRoot.querySelector('a');
      this.link.href = this.page
    }

    connectedCallback() {
        this.link.addEventListener('click', this.activateRoute.bind(this))
        this.render()
    }
    
    activateRoute(e) {
        this.dispatchEvent(new CustomEvent('route-clicked', { detail: this.page }))
        // console.log('clicked link', this.page)
        e.preventDefault();
        // let path = decodeURI(location.pathname).replace(/\/$/, '').replace(/^\//, '');;
        // console.log('path:', path)
        //window.history.pushState({}, '', this.page)
        
        
    }

    adoptedCallback() {
        console.log('Custom square element moved to new page.');
    }

    // Getter to let component know what attributes
    // to watch for mutation
    static get observedAttributes() {
      return ['data-page'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            this.render()
        }
      console.log(`${attr} was changed from ${oldValue} to ${newValue}!`)

    }

    render() {
        
    }
    
    disconnectedCallback() {
      // remove event listeners
        console.log('Custom square element removed from page.');
      }
      

    get page() {
      return this.dataset.page;
    }
    set page(value) {
      this.dataset.page = value;
    }
   
  }

  window.customElements.define('route-link', RouteLink);
})();
