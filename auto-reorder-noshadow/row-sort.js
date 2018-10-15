window.customElements.define('row-sort', class extends HTMLElement {

    generateTemplate() {

        const template = document.createElement('template')

        template.innerHTML = `
            <style>
                div {
                    display: flex;  
                    padding: .4rem;
                }
                col-sort {
                    flex: 1;
                    padding: .1rem;
                } 
                .elem_animate {
                    transition: transform 1s;
                }
                .task_elem_animate {
                    animation-duration: 1s;
                    animation-name: slide;                    
                  }
                  @keyframes slide {
                    from {
                      opacity: 0.2;                  
                      margin-left:-100vw;
                      margin-right:100vw;

                    }
                    to {
                      opacity: 1;
                      margin-left: 0vw;
                      margin-right: 0vw;
                    }
                  }

            </style>
            <div class="task_elem_animate elem_animate"><slot></slot></div>            
        `
        return template
    }

    constructor() {
        super()
        //this.attachShadow({ mode: 'open' })
        //this.shadowRoot.appendChild(this.generateTemplate().content.cloneNode(true))
        //this.element = this.shadowRoot.querySelector('div')    
        
         
       
    }
    
    
    connectedCallback() {
        if ( !this.item.classList.contains('elem_animate'))
            this.item.classList.add('task_elem_animate')
        
        this.item.classList.add('elem_animate')
         
    }
    
    
    get item(){
        return this
    }
    
    disconnectedCallback() {
        this.item.classList.remove('task_elem_animate')
    }

    static get observedAttributes() {
      return ['data-required_position', 'data-ypos']
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            if ( attr ==='data-ypos') {
                this.setTranslate(newValue)
            } else {                
                this.item.dataset.requiredPosition = newValue
            }
        }        
    }
    
    setTranslate(yPos) {
        if ( yPos == 0) {
            this.item.classList.remove('elem_animate')
        } else {
            this.item.classList.add('elem_animate')
        }
        this.item.style.transform = `translate(0px, ${yPos}px)`;
    }
    
   

});

