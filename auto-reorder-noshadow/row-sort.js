window.customElements.define('row-sort', class extends HTMLElement {
   
    constructor() {
        super()
    }
        
    connectedCallback() {
        if ( !this.classList.contains('connected'))
            this.classList.add('row-sort-new-animate')
        
        this.classList.add('row-sort-animate', 'connected')
    }
        
    disconnectedCallback() {
        this.classList.remove('row-sort-new-animate')
    }

    static get observedAttributes() {
      return ['data-required-position', 'data-ypos']
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            if ( attr ==='data-ypos') {
                this.setTranslate(newValue)
            } 
        }        
    }
    
    setTranslate(yPos) {
        if ( yPos == 0) {
            this.classList.remove('row-sort-animate')
        } else {
            this.classList.add('row-sort-animate')
        }
        this.style.transform = `translate(0px, ${yPos}px)`
    }
    
});

