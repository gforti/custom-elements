window.customElements.define('{{name}}', class extends HTMLElement {

    generateTemplate() {

        const template = document.createElement('template')

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
        `
        return template
    }

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(this.generateTemplate().content.cloneNode(true))
        // this.element = this.shadowRoot.querySelector('slot')
        // this.functionBind = this.function.bind(this)
    }

    connectedCallback() {
        console.log('Custom element added to page.')
        // this.element.addEventListener('click', this.functionBind)
        this.render()
    }
    
    disconnectedCallback() {
        // remove event listeners
        console.log('Custom element removed from page.')
        // this.element.removeEventListener('click', this.functionBind)
    }

    adoptedCallback() {
        console.log('Custom element moved to new page.')
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
    
    /* function.bind() {
            this.dispatchEvent(new CustomEvent('{{name}}-click', { detail: this.element.value }))
        }
     */


});