window.customElements.define('row-sort', class extends HTMLElement {
   
    constructor() {
        super()
    }
        
    connectedCallback() {
        if ( !this.row.classList.contains('elem_animate'))
            this.row.classList.add('task_elem_animate')
        
        this.row.classList.add('elem_animate')
    }
    
    
    get row(){
        return this
    }
    
    disconnectedCallback() {
        this.row.classList.remove('task_elem_animate')
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
            this.row.classList.remove('elem_animate')
        } else {
            this.row.classList.add('elem_animate')
        }
        this.row.style.transform = `translate(0px, ${yPos}px)`;
    }
    
   

});

