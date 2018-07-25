(async () => {

    function generateTemplate() {

        const template = document.createElement('template');

        template.innerHTML = `
            <style>
                :host h1 {
                  font-size: 2.5rem;
                  color: var(--TemplateClass-color, red);
                }

            </style>
            <article>
                <h1>TemplateClass</h1>
            </article>
        `;
        return template;
    }

  class TemplateClass extends HTMLElement {

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(generateTemplate().content.cloneNode(true));
    }

    connectedCallback() {
        console.log('Custom element added to page.');
        this.render()
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

    disconnectedCallback() {
      // remove event listeners
        console.log('Custom element removed from page.');
    }

      render() {
    }


  }

  window.customElements.define('template-class', TemplateClass);
})();