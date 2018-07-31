(async () => {
    /*
     * <{{name}}></{{name}}>
     * <script src="{{name}}.element.js"></script>
     */
    function generateTemplate() {

        const template = document.createElement('template');

        template.innerHTML = `
            <style>
                :host h1 {
                  font-size: 2.5rem;
                  color: var(--on-surface, red);
                }

            </style>
            <article>
                <h1>{{title}}</h1>
                <slot></slot>
            </article>
        `;
        return template;
    }

  class {{title}} extends HTMLElement {

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(generateTemplate().content.cloneNode(true));
    }

    connectedCallback() {
        console.log('Custom element added to page.');
        this.render()
    }
    
    disconnectedCallback() {
      // remove event listeners
        console.log('Custom element removed from page.');
    }

    adoptedCallback() {
        console.log('Custom element moved to new page.');
    }

    static get observedAttributes() {
      return [];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            this.render()
        }
        console.log(`${attr} was changed from ${oldValue} to ${newValue}!`)
    }

    render() {
    }

  }

  window.customElements.define('{{name}}', {{title}});
})();