window.customElements.define('col-sort', class extends HTMLElement {

    constructor() {
        super()       
    }
    
    static get observedAttributes() {
      return ['data-display']
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            this.textContent = newValue            
        }        
    }

});

