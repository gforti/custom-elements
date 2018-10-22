window.customElements.define('col-sort', class extends HTMLElement {

    constructor() {
        super()
        this.removeClassBind = this.removeClass.bind(this)
    }
    
    static get observedAttributes() {
      return ['data-display']
    }
    
    connectedCallback() {       
        this.addEventListener('animationend', this.removeClassBind)
    }
    
    disconnectedCallback() {
        this.removeEventListener('animationend', this.removeClassBind)
    }
        

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            this.textContent = newValue
            this.classList.add('col-sort-animate')            
        }        
    }
    
    removeClass() {
       this.classList.remove('col-sort-animate') 
    }

});

