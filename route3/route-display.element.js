window.customElements.define('route-display', class extends HTMLElement {

    constructor() {
        super()
    }
    
    static get observedAttributes() {
        return ['data-content']
    }
    
    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            this.innerHTML = this.dataset.content
        }
    }

})