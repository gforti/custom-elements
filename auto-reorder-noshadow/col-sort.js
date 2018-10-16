window.customElements.define('col-sort', class extends HTMLElement {

    constructor() {
        super()       
    }
    
    get col(){
        return this
    }
    
    disconnectedCallback() {       
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

