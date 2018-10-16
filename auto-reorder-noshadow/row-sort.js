window.customElements.define('row-sort', class extends HTMLElement {
   
    constructor() {
        super()
    }
        
    connectedCallback() {
        if ( !this.row.classList.contains('row-sort-animate'))
            this.row.classList.add('row-sort-new-animate')
        
        this.row.classList.add('row-sort-animate')
    }
    
    
    get row(){
        return this
    }
    
    disconnectedCallback() {
        this.row.classList.remove('row-sort-new-animate')
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
            this.row.classList.remove('row-sort-animate')
        } else {
            this.row.classList.add('row-sort-animate')
        }
        this.row.style.transform = `translate(0px, ${yPos}px)`;
    }
    
   

});

