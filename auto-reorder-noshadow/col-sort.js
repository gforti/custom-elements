window.customElements.define('col-sort', class extends HTMLElement {

    generateTemplate() {

        const template = document.createElement('template')

        template.innerHTML = `
            <style>
                div {
                    flex: 1;
                    padding: .1rem;
                }                
            </style>
            <div></div>         
        `
        return template
    }

    constructor() {
        super()
        //this.attachShadow({ mode: 'open' })
        //this.appendChild(this.generateTemplate().content.cloneNode(true))
        //this.element = this.querySelector('div')        
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

